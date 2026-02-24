// application/dto/create-activity.dto.ts

import { IsDate, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class UpdateProfileDto {

    @IsNanoId()
    @IsNotEmpty()
    userId!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    firstName!: string;

    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{7,14}$/, { message: "phone number invalid" })
    phone!: string;

    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    @IsDate()
    birth!: Date;

    @IsOptional()
    whatsApp!: string;

    @IsOptional()
    linkedlinUrl?: string;

    @IsOptional()
    githubUrl?: string;

    @IsOptional()
    avatarUrl?: string;
}
