import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { Utils } from "../../../../commons/utils.commons";
import { CreateTalkLangageCommand } from "src/domain/port/in/talk-langage/create-talk-langage.interface.port";
import { LevelEnum } from "src/domain/enums/level.enum";

export class CreateTalkLangageValidator {

    validate(command: CreateTalkLangageCommand): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }

        if (!command.name || !command.name.trim()) {
            throw new BusinessError(CodesError.NAME_REQUIRED);
        }

        if (!Object.values(LevelEnum).includes(command.stage)) {
            throw new BusinessError(CodesError.STAGE_INVALID);
        }
    }
}