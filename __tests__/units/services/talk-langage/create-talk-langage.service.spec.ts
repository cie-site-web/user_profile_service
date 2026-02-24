import { describe, it, expect, beforeEach } from "vitest";
import { CreateTalkLangageValidator } from "src/domain/service/validators/talk-langage/create-talk-langage.validator";
import { CreateTalkLangageCommand } from "src/domain/port/in/talk-langage/create-talk-langage.interface.port";
import { LevelEnum } from "src/domain/enums/level.enum";
import { CodesError } from "src/domain/errors/codes.error";
import { BusinessError } from "src/domain/errors/business.error";

describe("CreateTalkLangageValidator (Full Coverage)", () => {
  let validator: CreateTalkLangageValidator;

  beforeEach(() => {
    validator = new CreateTalkLangageValidator();
  });

  // -----------------------------
  // Commande valide de base
  // -----------------------------
  const validCommand: CreateTalkLangageCommand = {
    publicId: "V1StGXR8_Z5jdHi6B-myT",
    name: "Moore",
    stage: LevelEnum.INTERMEDIATE
  };

  it("should validate a correct command", () => {
    expect(() => validator.validate(validCommand)).not.toThrow();
  });
// -------------------------------------------------
  // TEST DES CAS INVALIDES
  // -------------------------------------------------
  const invalidTests: {
    field: keyof CreateTalkLangageCommand;
    invalidValues: any[];
    expectedError: CodesError;
  }[] = [
    {
      field: 'publicId',
      invalidValues: ['', 'short', '123456', '###invalid###'],
      expectedError: CodesError.PUBLIC_ID_INVALID
    },
    {
      field: 'name',
      invalidValues: [''],
      expectedError: CodesError.NAME_REQUIRED
    },
    {
      field: 'stage',
      invalidValues: ['', 'scjscj', 'dycx'],
      expectedError: CodesError.STAGE_INVALID
    },
  ];

  invalidTests.forEach(({ field, invalidValues, expectedError }) => {
    invalidValues.forEach((value) => {
      it(`should throw ${expectedError} when ${field} is "${value}"`, () => {
        const testCommand: CreateTalkLangageCommand = {
          ...validCommand,
          [field]: value
        } as CreateTalkLangageCommand;

        expect(() => validator.validate(testCommand)).toThrowError(
          new BusinessError(expectedError)
        );
      });
    });
  });

  // -------------------------------------------------
  // TEST DES CAS VALIDES DYNAMIQUES
  // -------------------------------------------------
  const validTests: {
    field: keyof CreateTalkLangageCommand;
    validValues: any[];
  }[] = [
    {
      field: 'publicId',
      validValues: ['abc1_u3uuiui223def456', '987654321xyzF1739__g3']
    },
    {
      field: 'name',
      validValues: ['abc1_u3uuiui223def456', '987654321xyzF1739__g3']
    },
    {
      field: 'stage',
      validValues: [LevelEnum.BILINGUAL, LevelEnum.GOOD],
    },
  ];

  validTests.forEach(({ field, validValues }) => {
    validValues.forEach((value) => {
      it(`should NOT throw error when ${field} is valid value "${value}"`, () => {
        const testCommand: CreateTalkLangageCommand = {
          ...validCommand,
          [field]: value
        } as CreateTalkLangageCommand;

        expect(() => validator.validate(testCommand)).not.toThrow();
      });
    });
  });
});
