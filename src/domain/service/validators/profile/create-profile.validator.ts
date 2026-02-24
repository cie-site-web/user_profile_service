import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateProfileCommand } from "src/domain/port/in/profile/create-profile.interface.port";
import { Utils } from "../../../../commons/utils.commons";

export class CreateProfileValidator {

    validate(command: CreateProfileCommand): void {

        
        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }

        if (!Utils.nanoidRegex.test(command.userId)) {
            throw new BusinessError(CodesError.USER_INVALID);
        }

        if (!command.lastName || !command.lastName.trim()) {
            throw new BusinessError(CodesError.LAST_NAME_REQUIRED);
        }

        if (!command.firstName || !command.firstName.trim()) {
            throw new BusinessError(CodesError.FIRST_NAME_REQUIRED);
        }

        if ((!command.phone || !command.phone.trim()) || (command.phone && !Utils.phoneRegex.test(command.phone))) {
            throw new BusinessError(CodesError.PHONE_INVALID);
        }

        if (!command.address || !command.address.trim()) {
            throw new BusinessError(CodesError.ADDRESS_REQUIRED);
        }

        const date = new Date(command.birth);
        if (isNaN(date.getTime())) {
            throw new BusinessError(CodesError.BIRTH_INVALID);
        }

        if (command.whatsApp && !Utils.phoneRegex.test(command.whatsApp)) {
            throw new BusinessError(CodesError.WHATSAPP_INVALID);
        }

        if (command.githubUrl && !Utils.isValidUrl(command.githubUrl, 'github.com') || (!command.githubUrl || !command.githubUrl.trim())) {
            throw new BusinessError(CodesError.GITHUB_URL_INVALID);
        }

        if (command.linkedinUrl && !Utils.isValidUrl(command.linkedinUrl, 'www.linkedin.com') || (!command.linkedinUrl || !command.linkedinUrl.trim())) {
            throw new BusinessError(CodesError.LINKEDIN_URL_INVALID);
        }

        if ((command.avatarUrl && !Utils.isValidUrl(command.avatarUrl)) || (!command.avatarUrl || !command.avatarUrl.trim())) {
            throw new BusinessError(CodesError.AVATAR_URL_INVALID);
        }
    }
}