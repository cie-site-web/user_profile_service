// __tests__/units/services/user/create-user.validator.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { StatusEnum } from "src/domain/enums/status.enum";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateUserCommand } from "src/domain/port/in/user/create-user.interface.port";
import { CreateUserValidator } from "src/domain/service/validators/user/create-user.validator";

describe('CreateUserValidator (Full Coverage)', () => {
  let validator: CreateUserValidator;

  beforeEach(() => {
    validator = new CreateUserValidator();
  });

  // Commande de base valide
  const validCommand: CreateUserCommand = {
    publicId: 'V1StGXR8_Z5jdHi6B-myT',
    email: 'user@example.com',
    password: 'Aa123456!',
    status: StatusEnum.ACTIVE,
  };


  it('should pass validation for a completely valid command', () => {
    expect(() => validator.validate(validCommand)).not.toThrow();
  });

  // -------------------------------------------------
  // TEST DES CAS INVALIDES
  // -------------------------------------------------
  const invalidTests: {
    field: keyof CreateUserCommand;
    invalidValues: any[];
    expectedError: CodesError;
  }[] = [
      { 
        field: 'publicId',
        invalidValues: ['badvdnvndvn218', '', '123777834rnncbwdbbdvebvndsnbvnsb', '#$%^jhejjd=+HHEche3!@'], 
        expectedError: CodesError.PUBLIC_ID_INVALID 
      },
      { 
        field: 'email', 
        invalidValues: ['bademail', 'a@b', ''], 
        expectedError: CodesError.EMAIL_INVALID 
      },
      {
        field: 'password', invalidValues: ['short', '123456', 'password',''], 
        expectedError: CodesError.PASSWORD_INVALID 
      },
      { 
        field: 'status', 
        invalidValues: ['INVALID', 999, null,''], 
        expectedError: CodesError.STATUS_INVALID 
      },
    ];

  invalidTests.forEach(({ field, invalidValues, expectedError }) => {
    invalidValues.forEach((value) => {
      it(`should throw ${expectedError} when ${field} is "${value}"`, () => {
        const testCommand: CreateUserCommand = { ...validCommand, [field]: value } as CreateUserCommand;
        expect(() => validator.validate(testCommand)).toThrowError(
          new BusinessError(expectedError)
        );
      });
    });
  });

  // -------------------------------------------------
  // TEST DES CAS VALIDES POUR CHAQUE CHAMP
  // -------------------------------------------------
  const validTests: {
    field: keyof CreateUserCommand;
    validValues: any[];
  }[] = [
      { 
        field: 'publicId', 
        validValues: ['abc1_u3uuiui223def456', '987654321xyzF1739__g3'] 
      },
      { 
        field: 'email', 
        validValues: ['a@b.com', 'user.name@example.org'] 
      },
      { 
        field: 'password', 
        validValues: ['Aa123456!', 'StrongPass1$'] 
      },
      { 
        field: 'status', 
        validValues: Object.values(StatusEnum) 
      },
    ];

  validTests.forEach(({ field, validValues }) => {
    validValues.forEach((value) => {
      it(`should NOT throw error when ${field} is valid value "${value}"`, () => {
        const testCommand: CreateUserCommand = { ...validCommand, [field]: value } as CreateUserCommand;
        expect(() => validator.validate(testCommand)).not.toThrow();
      });
    });
  });
});
