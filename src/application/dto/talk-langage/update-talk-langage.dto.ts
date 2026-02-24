// application/dto/create-talk-langage.dto.ts

import { IsOptional } from 'class-validator';
import { LevelEnum } from 'src/domain/enums/level.enum';

export class UpdateTalkLangageDto {
   
    @IsOptional()
    name?: string;

    @IsOptional()
    stage?: LevelEnum;
}
