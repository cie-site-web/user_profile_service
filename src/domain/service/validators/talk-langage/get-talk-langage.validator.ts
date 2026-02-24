import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetTalkLangageQuery } from "src/domain/port/in/talk-langage/get-talk-langage.interface.port";
import { Utils } from "../../../../commons/utils.commons";

export class GetTalkLangageValidator {

    validate(command: GetTalkLangageQuery): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}