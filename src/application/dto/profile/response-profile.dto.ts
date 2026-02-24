// application/dto/response-user.dto.ts

import { IsDate, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class ResponseProfileDto {

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
        linkedinUrl?: string | null;

        @IsOptional()
        githubUrl?: string | null;

        @IsOptional()
        avatarUrl?: string | null;
}
