// application/dto/create-activity.dto.ts

import { IsDate, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class CreateProfileDto {
    
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

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

    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{7,14}$/, { message: "phone number invalid" })
    whatsApp!: string;

    @IsOptional()
    linkedinUrl?: string;

    @IsOptional()
    githubUrl?: string;

    @IsOptional()
    avatarUrl?: string;
}
