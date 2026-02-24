// __tests__/units/services/profile/create-profile.validator.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateProfileValidator } from "src/domain/service/validators/profile/create-profile.validator";
import { CreateProfileCommand } from "src/domain/port/in/profile/create-profile.interface.port";

describe('CreateProfileValidator (Full Coverage)', () => {
  let validator: CreateProfileValidator;

  beforeEach(() => {
    validator = new CreateProfileValidator();
  });

  // -----------------------------
  // Commande valide de base
  // -----------------------------
  const validCommand: CreateProfileCommand = {
    publicId: "V1StGXR8_Z5jdHi6B-myT",
    userId: "s1SzGXRd_Z1jdHi6B-myT",
    lastName: "SISSAO",
    firstName: "Moussa Bassana",
    phone: "+22660783979",
    address: "Ouagadougou",
    birth: new Date("1995-06-15"),
    whatsApp: "+33612345678",
    linkedinUrl: "https://www.linkedin.com/in/john-doe",
    githubUrl: "https://github.com/fbeline",
    avatarUrl: "https://example.com/avatar.jpg"
  };

  it('should pass validation for a completely valid command', () => {
    expect(() => validator.validate(validCommand)).not.toThrow();
  });

  // -------------------------------------------------
  // TEST DES CAS INVALIDES
  // -------------------------------------------------
  const invalidTests: {
    field: keyof CreateProfileCommand;
    invalidValues: any[];
    expectedError: CodesError;
  }[] = [
    {
      field: 'publicId',
      invalidValues: ['', 'short', '123456', '###invalid###'],
      expectedError: CodesError.PUBLIC_ID_INVALID
    },
    {
      field: 'userId',
      invalidValues: ['', 'bad-id', '123'],
      expectedError: CodesError.USER_INVALID
    },
    {
      field: 'lastName',
      invalidValues: [''],
      expectedError: CodesError.LAST_NAME_REQUIRED
    },
    {
      field: 'firstName',
      invalidValues: [''],
      expectedError: CodesError.FIRST_NAME_REQUIRED
    },
    {
      field: 'phone',
      invalidValues: ['abc', '12345', '+33'],
      expectedError: CodesError.PHONE_INVALID
    },
    {
      field: 'whatsApp',
      invalidValues: ['abc', '12345', '+1'],
      expectedError: CodesError.WHATSAPP_INVALID
    },
    {
      field: 'linkedinUrl',
      invalidValues: ['not-a-url', 'linkedin.com/test'],
      expectedError: CodesError.LINKEDIN_URL_INVALID
    },
    {
      field: 'githubUrl',
      invalidValues: ['github', 'http:/bad-url'],
      expectedError: CodesError.GITHUB_URL_INVALID
    },
    {
      field: 'avatarUrl',
      invalidValues: ['invalid', 'ftp://badurl'],
      expectedError: CodesError.AVATAR_URL_INVALID
    }
  ];

  invalidTests.forEach(({ field, invalidValues, expectedError }) => {
    invalidValues.forEach((value) => {
      it(`should throw ${expectedError} when ${field} is "${value}"`, () => {
        const testCommand: CreateProfileCommand = {
          ...validCommand,
          [field]: value
        } as CreateProfileCommand;

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
    field: keyof CreateProfileCommand;
    validValues: any[];
  }[] = [
    {
      field: 'publicId',
      validValues: ['abc1_u3uuiui223def456', '987654321xyzF1739__g3']
    },
    {
      field: 'userId',
      validValues: ['abc1_u3uuiui223def456', '987654321xyzF1739__g3']
    },
    {
      field: 'lastName',
      validValues: ['SISSAO', 'PARE'],
    },
    {
      field: 'firstName',
      validValues: ['Moussa', 'Bassana'],
    },
    {
      field: 'phone',
      validValues: ['+33612345678', '+22660783979']
    },
    {
      field: 'whatsApp',
      validValues: ['+33612345678', '+447911123456']
    },
    {
      field: 'linkedinUrl',
      validValues: ['https://www.linkedin.com/in/test-user']
    },
    {
      field: 'githubUrl',
      validValues: ['https://github.com/testuser']
    },
    {
      field: 'avatarUrl',
      validValues: ['https://cdn.site.com/avatar.png']
    }
  ];

  validTests.forEach(({ field, validValues }) => {
    validValues.forEach((value) => {
      it(`should NOT throw error when ${field} is valid value "${value}"`, () => {
        const testCommand: CreateProfileCommand = {
          ...validCommand,
          [field]: value
        } as CreateProfileCommand;

        expect(() => validator.validate(testCommand)).not.toThrow();
      });
    });
  });
});
