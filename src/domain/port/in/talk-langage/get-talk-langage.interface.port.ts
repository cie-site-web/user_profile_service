import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { LevelEnum } from "src/domain/enums/level.enum";

export interface GetTalkLangageQuery {
    publicId: string;
}

export interface GetTalkLangageResponse {
    publicId: string;
    name: string;
    stage: LevelEnum;
}

export interface GetTalkLangageInterfacePort {
    execute(query: GetTalkLangageQuery): Promise<TalkLangageEntity | null>
}