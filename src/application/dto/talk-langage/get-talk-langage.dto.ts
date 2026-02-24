// application/dto/create-talk-langage.dto.ts

import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class GetTalkLangageDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;
}
