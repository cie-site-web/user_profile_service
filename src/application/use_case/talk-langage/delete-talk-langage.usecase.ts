import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteTalkLangageCommand, DeleteTalkLangageInterfacePort } from "src/domain/port/in/talk-langage/delete-talk-langage.interface.port";
import { TalkLangageRepositoryPort } from "src/domain/port/out/talk-langage.repository.port";
import { DeleteTalkLangageValidator } from "src/domain/service/validators/talk-langage/delete-talk-langage.validator";

export class DeleteTalkLangageUseCase implements DeleteTalkLangageInterfacePort {

    constructor(
        private readonly repository: TalkLangageRepositoryPort,
        private readonly validator: DeleteTalkLangageValidator,
    ) { }

    async execute(command: DeleteTalkLangageCommand): Promise<void> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.USER_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}
