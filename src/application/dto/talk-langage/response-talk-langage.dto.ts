// application/dto/response-talk-langage.dto.ts

import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';
import { LevelEnum } from 'src/domain/enums/level.enum';

export class ResponseTalkLangageDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    stage!: LevelEnum;
}
