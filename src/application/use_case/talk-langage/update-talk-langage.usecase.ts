import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { UpdateTalkLangageCommand, UpdateTalkLangageInterfacePort } from "src/domain/port/in/talk-langage/update-talk-langage.interface.port";
import { TalkLangageRepositoryPort } from "src/domain/port/out/talk-langage.repository.port";
import { UpdateTalkLangageValidator } from "src/domain/service/validators/talk-langage/update-talk-langage.validator";


export class UpdateTalkLangageUseCase implements UpdateTalkLangageInterfacePort {

    constructor(
        private readonly repository: TalkLangageRepositoryPort,
        private readonly validator: UpdateTalkLangageValidator,
    ) {}

    async execute(command: UpdateTalkLangageCommand): Promise<TalkLangageEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.TALK_LANGAGE_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
