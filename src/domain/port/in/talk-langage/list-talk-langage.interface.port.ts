import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { LevelEnum } from "src/domain/enums/level.enum";

export interface ListTalkLangageQuery {
    page: number;
    limit: number;
    name?: string;
    stage?: LevelEnum;
}

export interface listTalkLangageInterfacePort {
    execute(query: ListTalkLangageQuery): Promise<PaginatedResponse<TalkLangageEntity>>
}