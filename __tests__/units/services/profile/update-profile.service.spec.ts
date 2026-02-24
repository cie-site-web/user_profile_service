// src/domain/services/user/__tests__/update-user.validator.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateProfileValidator } from "src/domain/service/validators/profile/update-profile.validator";
import { UpdateProfileCommand } from "src/domain/port/in/profile/update-profile.interface.port";

describe('UpdateProfileValidator (Full Coverage)', () => {
    let validator: UpdateProfileValidator;

    beforeEach(() => {
        validator = new UpdateProfileValidator();
    });

    const validCommand: UpdateProfileCommand = {
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

    // -----------------------------
    // Tests invalides dynamiques
    // -----------------------------
    const invalidTests: {
        field: keyof UpdateProfileCommand;
        invalidValues: any[];
        expectedError: CodesError;
    }[] = [
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
                const testCommand: UpdateProfileCommand = { ...validCommand, [field]: value } as UpdateProfileCommand;
                expect(() => validator.validate(testCommand)).toThrowError(
                    new BusinessError(expectedError)
                );
            });
        });
    });

    // -----------------------------
    // Tests valides dynamiques
    // -----------------------------
    const validTests: {
        field: keyof UpdateProfileCommand;
        validValues: any[];
    }[] = [
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
                const testCommand: UpdateProfileCommand = { ...validCommand, [field]: value } as UpdateProfileCommand;
                expect(() => validator.validate(testCommand)).not.toThrow();
            });
        });
    });
});
