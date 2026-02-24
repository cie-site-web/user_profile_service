import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { CreateTalkLangageCommand, CreateTalkLangageInterfacePort } from "src/domain/port/in/talk-langage/create-talk-langage.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { TalkLangageRepositoryPort } from "src/domain/port/out/talk-langage.repository.port";
import { CreateTalkLangageValidator } from "src/domain/service/validators/talk-langage/create-talk-langage.validator";


export class CreateTalkLangageUseCase implements CreateTalkLangageInterfacePort {

  constructor(
    private readonly repository: TalkLangageRepositoryPort,
    private readonly validator: CreateTalkLangageValidator,
    private readonly PublicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreateTalkLangageCommand): Promise<TalkLangageEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByPublicId(command.publicId);
    if (existing) {
      throw new ApplicationError(CodesError.DUPLICATE_TALK_LANGAGE);
    }

    const publicId = this.PublicIdGenerator.generate();

    const talkLangage = new TalkLangageEntity({
      publicId: publicId,
      name: command.name,
      stage: command.stage,
    });

    return this.repository.save(talkLangage);
  }
}
