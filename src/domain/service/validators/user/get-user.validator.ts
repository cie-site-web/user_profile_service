import { StatusEnum } from "src/domain/enums/status.enum";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateUserCommand } from "src/domain/port/in/user/create-user.interface.port";
import { GetUserQuery } from "src/domain/port/in/user/get-user.interface.port";
import { Utils } from "../../../../commons/utils.commons";

export class GetUserValidator {

    validate(command: GetUserQuery): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}