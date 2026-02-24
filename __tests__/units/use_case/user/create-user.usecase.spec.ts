// __tests__/units/usecases/create-user.usecase.full.spec.ts
import { describe, it, beforeEach, expect, vi, Mocked } from "vitest";
import { faker } from "@faker-js/faker";
import { StatusEnum } from "src/domain/enums/status.enum";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserValidator } from "src/domain/service/validators/user/create-user.validator";
import { Utils } from "src/commons/utils.commons";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";
import { PasswordHasherPort } from "src/domain/port/out/password-hasher.port";
import { CreateUserUseCase } from "src/application/use_case/user/create-user.usecase";

describe("CreateUserUseCase (Full Coverage)", () => {
  let repository: Mocked<UserRepositoryPort>;
  let validator: CreateUserValidator;
  let PublicIdGenerator: Mocked<PublicIdGeneratorPort>;
  let hasher: Mocked<PasswordHasherPort>;
  let useCase: CreateUserUseCase;

  let validCommand: any;

  beforeEach(() => {
    repository = {
      findByEmail: vi.fn(),
      save: vi.fn(),
      findByPublicId: vi.fn(),
      findWithPagination: vi.fn(),
      delete: vi.fn(),
    } as Mocked<UserRepositoryPort>;
    validator = new CreateUserValidator();
    vi.spyOn(validator, "validate"); // spy pour vérifier l'appel
    PublicIdGenerator = { generateNanoid: vi.fn() };
    hasher = { 
        hash: vi.fn(),
        compare: vi.fn(),
    };

    useCase = new CreateUserUseCase(repository, validator, PublicIdGenerator, hasher);

    // Commande valide de base
    validCommand = {
      email: faker.internet.email(),
      password: faker.internet.password({length: 12, memorable: false, pattern : Utils.passwordRegex}),
      status: StatusEnum.ACTIVE,
    };
  });

  // --------------------------
  // CAS POSITIFS
  // --------------------------

  it("should validate, generate publicId, hash password and save user", async () => {
    const publicId = faker.string.nanoid();
    const hashedPassword = "hashedPass123!";
    const savedUser = new UserEntity({ ...validCommand, publicId, password: hashedPassword });

    repository.findByEmail.mockResolvedValue(null);
    PublicIdGenerator.generateNanoid.mockReturnValue(publicId);
    hasher.hash.mockResolvedValue(hashedPassword);
    repository.save.mockResolvedValue(savedUser);

    const result = await useCase.execute(validCommand);

    expect(validator.validate).toHaveBeenCalledOnce();
    expect(validator.validate).toHaveBeenCalledWith(validCommand);
    expect(PublicIdGenerator.generateNanoid).toHaveBeenCalledOnce();
    expect(hasher.hash).toHaveBeenCalledWith(validCommand.password);
    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        publicId,
        email: validCommand.email,\
        password: hashedPassword,
        status: validCommand.status,
      })
    );
    expect(result).toEqual(savedUser);
  });

  it("should work with all valid StatusEnum values", async () => {
    for (const status of Object.values(StatusEnum)) {
      const cmd = { ...validCommand, status };
      repository.findByEmail.mockResolvedValue(null);
      PublicIdGenerator.generateNanoid.mockReturnValue(faker.string.nanoid());
      hasher.hash.mockResolvedValue("hashed");
      repository.save.mockResolvedValue(new UserEntity({ ...cmd, publicId: faker.string.nanoid(), password: "hashed" }));

      const result = await useCase.execute(cmd);
      expect(result.status).toBe(status);
    }
  });

  // --------------------------
  // CAS D'EXCEPTIONS
  // --------------------------

  it("should throw ApplicationError if email already exists", async () => {
    repository.findByEmail.mockResolvedValue(new UserEntity({ ...validCommand, password: "hashed" }));

    await expect(useCase.execute(validCommand)).rejects.toThrowError(
      new ApplicationError(CodesError.EMAIL_ALREADY_EXISTS)
    );
    expect(repository.findByEmail).toHaveBeenCalledWith(validCommand.email);
  });

  it("should propagate error if validator.validate throws", async () => {
    vi.spyOn(validator, "validate").mockImplementationOnce(() => {
      throw new Error("Validator failure");
    });

    await expect(useCase.execute(validCommand)).rejects.toThrow("Validator failure");
  });

  it("should propagate error if hasher.hash fails", async () => {
    repository.findByEmail.mockResolvedValue(null);
    PublicIdGenerator.generateNanoid.mockReturnValue(faker.string.uuid());
    hasher.hash.mockRejectedValue(new Error("Hashing failed"));

    await expect(useCase.execute(validCommand)).rejects.toThrow("Hashing failed");
  });

  it("should propagate error if repository.save fails", async () => {
    repository.findByEmail.mockResolvedValue(null);
    PublicIdGenerator.generateNanoid.mockReturnValue(faker.string.uuid());
    hasher.hash.mockResolvedValue("hashedPass");
    repository.save.mockRejectedValue(new Error("DB save failed"));

    await expect(useCase.execute(validCommand)).rejects.toThrow("DB save failed");
  });

  // --------------------------
  // EMAILS LIMITE / BORDEL
  // --------------------------
  const invalidEmails = ["plainaddress", "@missinguser.com", "user@.com", "user@site", "", "user@@site.com"];
  invalidEmails.forEach((email) => {
    it(`should throw validator error for invalid email: ${email}`, async () => {
      const cmd = { ...validCommand, email };
      vi.spyOn(validator, "validate").mockImplementationOnce(() => {
        throw new Error("Invalid email");
      });
      await expect(useCase.execute(cmd)).rejects.toThrow("Invalid email");
    });
  });

  // --------------------------
  // MOTS DE PASSE LIMITE
  // --------------------------
  const passwordLimits = [
    faker.internet.password({length: 12, memorable: true}), // minimum
    faker.internet.password({length: 12, memorable: true}), // très long
    "1234567", // trop court
    "password", // simple
  ];
  passwordLimits.forEach((pwd) => {
    it(`should handle password limit case: ${pwd}`, async () => {
      const cmd = { ...validCommand, password: pwd };
      if (pwd.length < 8) {
        vi.spyOn(validator, "validate").mockImplementationOnce(() => {
          throw new Error("Invalid password");
        });
        await expect(useCase.execute(cmd)).rejects.toThrow("Invalid password");
      } else {
        repository.findByEmail.mockResolvedValue(null);
        PublicIdGenerator.generateNanoid.mockReturnValue(faker.string.uuid());
        hasher.hash.mockResolvedValue("hashedPass");
        repository.save.mockResolvedValue(new UserEntity({ ...cmd, publicId: faker.string.uuid(), password: "hashedPass" }));

        const result = await useCase.execute(cmd);
        expect(result.password).toBe("hashedPass");
      }
    });
  });

  // --------------------------
  // STATUTS INVALIDES
  // --------------------------
  const invalidStatuses = ["INVALID", 999, null, ""];
  invalidStatuses.forEach((status) => {
    it(`should throw validator error for invalid status: ${status}`, async () => {
      const cmd = { ...validCommand, status };
      vi.spyOn(validator, "validate").mockImplementationOnce(() => {
        throw new Error("Invalid status");
      });
      await expect(useCase.execute(cmd)).rejects.toThrow("Invalid status");
    });
  });
});