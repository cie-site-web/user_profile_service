// src/domain/services/user/__tests__/update-user.validator.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import { StatusEnum } from "src/domain/enums/status.enum";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateUserCommand } from "src/domain/port/in/user/update-user.interface.port";
import { UpdateUserValidator } from "src/domain/service/validators/user/update-user.validator";

describe('UpdateUserValidator (Dynamic)', () => {
    let validator: UpdateUserValidator;

    beforeEach(() => {
        validator = new UpdateUserValidator();
    });

    const validCommand: UpdateUserCommand = {
        email: 'user@example.com',
        password: 'Aa123456!',
        status: StatusEnum.ACTIVE,
    };

    // -----------------------------
    // Tests invalides dynamiques
    // -----------------------------
    const invalidTests: {
        field: keyof UpdateUserCommand;
        invalidValues: any[];
        expectedError: CodesError;
    }[] = [
            { field: 'email', invalidValues: ['bademail', 'a@b', ''], expectedError: CodesError.EMAIL_INVALID },
            { field: 'password', invalidValues: ['short', '123456', 'password'], expectedError: CodesError.PASSWORD_INVALID },
            { field: 'status', invalidValues: ['INVALID', 999, null], expectedError: CodesError.STATUS_INVALID },
        ];

    invalidTests.forEach(({ field, invalidValues, expectedError }) => {
        invalidValues.forEach((value) => {
            it(`should throw ${expectedError} when ${field} is "${value}"`, () => {
                const testCommand: UpdateUserCommand = { ...validCommand, [field]: value } as UpdateUserCommand;
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
        field: keyof UpdateUserCommand;
        validValues: any[];
    }[] = [
            { field: 'email', validValues: ['a@b.com', 'user.name@example.org'] },
            { field: 'password', validValues: ['Aa123456!', 'StrongPass1$'] },
            { field: 'status', validValues: Object.values(StatusEnum) },
        ];

    validTests.forEach(({ field, validValues }) => {
        validValues.forEach((value) => {
            it(`should NOT throw error when ${field} is valid value "${value}"`, () => {
                const testCommand: UpdateUserCommand = { ...validCommand, [field]: value } as UpdateUserCommand;
                expect(() => validator.validate(testCommand)).not.toThrow();
            });
        });
    });
});
