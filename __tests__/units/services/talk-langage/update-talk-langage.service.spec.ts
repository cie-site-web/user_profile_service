// src/domain/services/user/__tests__/update-user.validator.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateTalkLangageValidator } from "src/domain/service/validators/talk-langage/update-talk-langage.validator";
import { UpdateTalkLangageCommand } from "src/domain/port/in/talk-langage/update-talk-langage.interface.port";
import { LevelEnum } from "src/domain/enums/level.enum";

describe('UpdateTalkLangageValidator (Full Coverage)', () => {
    let validator: UpdateTalkLangageValidator;

    beforeEach(() => {
        validator = new UpdateTalkLangageValidator();
    });

    const validCommand: UpdateTalkLangageCommand = {
        name: "Moore",
        stage: LevelEnum.INTERMEDIATE
    };

    // -----------------------------
    // Tests invalides dynamiques
    // -----------------------------
    const invalidTests: {
        field: keyof UpdateTalkLangageCommand;
        invalidValues: any[];
        expectedError: CodesError;
    }[] = [
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
                const testCommand: UpdateTalkLangageCommand = { ...validCommand, [field]: value } as UpdateTalkLangageCommand;
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
        field: keyof UpdateTalkLangageCommand;
        validValues: any[];
    }[] = [
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
                const testCommand: UpdateTalkLangageCommand = { ...validCommand, [field]: value } as UpdateTalkLangageCommand;
                expect(() => validator.validate(testCommand)).not.toThrow();
            });
        });
    });
});
