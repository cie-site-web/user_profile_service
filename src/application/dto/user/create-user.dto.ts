// application/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { StatusEnum } from 'src/domain/enums/status.enum';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class CreateUserDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsEmail()
    email!: string;

    @MinLength(8)
    @Matches(/(?=.*\d)/, { message: 'password must contain a number' })
    @Matches(/(?=.*[^A-Za-z0-9])/, { message: 'password must contain a special character' })
    password!: string;

    @IsNotEmpty()
    status!: StatusEnum;
}
