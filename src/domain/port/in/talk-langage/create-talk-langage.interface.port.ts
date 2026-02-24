import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { LevelEnum } from "src/domain/enums/level.enum";

export interface CreateTalkLangageCommand {
    publicId: string;
    name: string;
    stage: LevelEnum;
}

export interface CreateTalkLangageInterfacePort {
    execute(command: CreateTalkLangageCommand): Promise<TalkLangageEntity>;
}