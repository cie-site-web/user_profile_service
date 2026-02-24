import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { Utils } from "../../../../commons/utils.commons";
import { DeleteProfileCommand } from "src/domain/port/in/profile/delete-profile.interface.port";

export class DeleteProfileValidator {

    validate(command: DeleteProfileCommand): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}