import { StatusEnum } from "src/domain/enums/status.enum";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateUserCommand } from "src/domain/port/in/user/create-user.interface.port";
import { Utils } from "../../../../commons/utils.commons";

export class CreateUserValidator {

    validate(command: CreateUserCommand): void {

        
        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }

        if (!Utils.emailRegex.test(command.email)) {
            throw new BusinessError(CodesError.EMAIL_INVALID);
        }

        if (!Utils.passwordRegex.test(command.password)) {
            throw new BusinessError(CodesError.PASSWORD_INVALID);
        }

        if (!Object.values(StatusEnum).includes(command.status)) {
            throw new BusinessError(CodesError.STATUS_INVALID);
        }
    }
}