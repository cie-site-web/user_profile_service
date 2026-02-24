// application/dto/update-user.dto.ts

import {
    IsEmail,
    IsOptional,
    Matches,
    MinLength,
} from 'class-validator';
import { StatusEnum } from 'src/domain/enums/status.enum';

export class UpdateUserDto {

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(8)
    @Matches(/(?=.*\d)/, { message: 'password must contain a number' })
    @Matches(/(?=.*[^A-Za-z0-9])/, { message: 'password must contain a special character' })
    password?: string;

    @IsOptional()
    status?: StatusEnum;  
}
