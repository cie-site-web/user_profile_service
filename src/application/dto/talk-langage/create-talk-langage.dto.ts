// application/dto/create-talk-langage.dto.ts

import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';
import { LevelEnum } from 'src/domain/enums/level.enum';

export class CreateTalkLangageDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    stage!: LevelEnum;
}
