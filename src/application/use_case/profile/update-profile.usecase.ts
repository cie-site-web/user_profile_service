import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { UpdateProfileCommand, UpdateProfileInterfacePort } from "src/domain/port/in/profile/update-profile.interface.port";
import { ProfileRepositoryPort } from "src/domain/port/out/profile.repository.port";
import { UpdateProfileValidator } from "src/domain/service/validators/profile/update-profile.validator";


export class UpdateProfileUseCase implements UpdateProfileInterfacePort {

    constructor(
        private readonly repository: ProfileRepositoryPort,
        private readonly validator: UpdateProfileValidator,
    ) { }

    async execute(command: UpdateProfileCommand): Promise<ProfileEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PROFILE_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
