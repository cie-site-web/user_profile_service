import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserEntity } from "src/domain/entities/user.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { CreateUserCommand, CreateUserInterfacePort } from "src/domain/port/in/user/create-user.interface.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";
import { CreateUserValidator } from "src/domain/service/validators/user/create-user.validator";
import { PasswordHasherPort } from "src/domain/port/out/password-hasher.port";

export class CreateUserUseCase implements CreateUserInterfacePort {

  constructor(
    private readonly repository: UserRepositoryPort,
    private readonly validator: CreateUserValidator,
    private readonly PublicIdGenerator: PublicIdGeneratorPort,
    private readonly hasher: PasswordHasherPort,
  ) { }

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByEmail(command.email);
    if (existing) {
      throw new ApplicationError(CodesError.EMAIL_ALREADY_EXISTS);
    }

    const publicId = this.PublicIdGenerator.generateNanoid();
    const hashedPassword = await this.hasher.hash(command.password);

    const user = new UserEntity({
      publicId: publicId,
      email: command.email,
      password: hashedPassword,
      status: command.status,
    });

    return this.repository.save(user);
  }
}
