import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { Utils } from "../../../../commons/utils.commons";
import { GetProfileQuery } from "src/domain/port/in/profile/get-profile.interface.port";

export class GetProfileValidator {

    validate(command: GetProfileQuery): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}