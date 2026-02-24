// src/domain/services/user/__tests__/delete-user.validator.dynamic.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteTalkLangageValidator } from "src/domain/service/validators/talk-langage/delete-talk-langage.validator";
import { DeleteProfileValidator } from "src/domain/service/validators/profile/delete-profile.validator";
import { DeleteTalkLangageCommand } from "src/domain/port/in/talk-langage/delete-talk-langage.interface.port";

describe('DeleteTalkLangageValidator (Full Coverage)', () => {
  let validator: DeleteTalkLangageValidator;

  beforeEach(() => {
    validator = new DeleteProfileValidator();
  });

   const validCommand: DeleteTalkLangageCommand = {
    publicId: 'V1StGXR8_Z5jdHi6B-myT',
  };

  // -------------------------------------------------
  // CAS INVALIDES DYNAMIQUES
  // -------------------------------------------------
  const invalidValues = ['short', '', '123', 'invalid!@#'];

  invalidValues.forEach((invalidId) => {
    it(`should throw PUBLIC_ID_INVALID for invalid publicId "${invalidId}"`, () => {
      const command: DeleteTalkLangageCommand = { ...validCommand, publicId: invalidId };
      expect(() => validator.validate(command)).toThrowError(
        new BusinessError(CodesError.PUBLIC_ID_INVALID)
      );
    });
  });

  // -------------------------------------------------
  // CAS VALIDES DYNAMIQUES (optionnel)
  // -------------------------------------------------
  const validValues = [
    'V1StGXR8_Z5jdHi6B-myT',
    'abcdefghijklmnopqrstu',
    '1234567890ABCDEFGHijk',
  ];

  validValues.forEach((value) => {
    it(`should NOT throw error for valid publicId "${value}"`, () => {
      const command: DeleteTalkLangageCommand = { ...validCommand, publicId: value };
      expect(() => validator.validate(command)).not.toThrow();
    });
  });
});
