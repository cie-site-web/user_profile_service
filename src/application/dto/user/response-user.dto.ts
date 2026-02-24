// application/dto/response-user.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';
import { StatusEnum } from 'src/domain/enums/status.enum';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class ResponseUserDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    status!: StatusEnum;
}
