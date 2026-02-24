import { LevelEnum } from "src/domain/enums/level.enum";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateTalkLangageCommand } from "src/domain/port/in/talk-langage/update-talk-langage.interface.port";

export class UpdateTalkLangageValidator {

    validate(command: UpdateTalkLangageCommand): void {

        if (!command.name || !command.name.trim()) {
            throw new BusinessError(CodesError.NAME_REQUIRED);
        }

        if (!Object.values(LevelEnum).includes(command.stage)) {
            throw new BusinessError(CodesError.STAGE_INVALID);
        }
    }
}