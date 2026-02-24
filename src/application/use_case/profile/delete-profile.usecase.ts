import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteProfileCommand, DeleteProfileInterfacePort } from "src/domain/port/in/profile/delete-profile.interface.port";
import { ProfileRepositoryPort } from "src/domain/port/out/profile.repository.port";
import { DeleteProfileValidator } from "src/domain/service/validators/profile/delete-profile.validator";

export class DeleteProfileUseCase implements DeleteProfileInterfacePort {

    constructor(
        private readonly repository: ProfileRepositoryPort,
        private readonly validator: DeleteProfileValidator,
    ) { }

    async execute(command: DeleteProfileCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PROFILE_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}
