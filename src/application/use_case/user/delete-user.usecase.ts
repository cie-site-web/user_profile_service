import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteUserCommand, DeleteUserInterfacePort } from "src/domain/port/in/user/delete-user.interface.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";
import { DeleteUserValidator } from "src/domain/service/validators/user/delete-user.validator";

export class DeleteUserUseCase implements DeleteUserInterfacePort {

    constructor(
        private readonly repository: UserRepositoryPort,
        private readonly validator: DeleteUserValidator,
    ) { }

    async execute(command: DeleteUserCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.USER_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}
