import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteUserCommand } from "src/domain/port/in/user/delete-user.interface.port";
import { Utils } from "../../../../commons/utils.commons";

export class DeleteUserValidator {

    validate(command: DeleteUserCommand): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}