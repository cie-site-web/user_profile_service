import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserEntity } from "src/domain/entities/user.entity";
import { GetUserQuery } from "src/domain/port/in/user/get-user.interface.port";
import { UpdateUserCommand, UpdateUserInterfacePort } from "src/domain/port/in/user/update-user.interface.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";
import { UpdateUserValidator } from "src/domain/service/validators/user/update-user.validator";

export class UpdateUserUseCase implements UpdateUserInterfacePort {

    constructor(
        private readonly repository: UserRepositoryPort,
        private readonly validator: UpdateUserValidator,
    ) { }

    async execute(query: GetUserQuery, command: UpdateUserCommand): Promise<UserEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.USER_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
