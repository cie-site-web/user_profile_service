import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { LevelEnum } from "src/domain/enums/level.enum";

export interface UpdateTalkLangageCommand {
    publicId: string;
    name: string;
    stage: LevelEnum;
}

export interface UpdateTalkLangageInterfacePort {
    execute(command: UpdateTalkLangageCommand): Promise<TalkLangageEntity>
}