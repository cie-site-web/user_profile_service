import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { GetTalkLangageInterfacePort, GetTalkLangageQuery } from "src/domain/port/in/talk-langage/get-talk-langage.interface.port";
import { TalkLangageRepositoryPort } from "src/domain/port/out/talk-langage.repository.port";
import { GetTalkLangageValidator } from "src/domain/service/validators/talk-langage/get-talk-langage.validator";

export class GetTalkLangageUseCase implements GetTalkLangageInterfacePort {

  constructor(
    private readonly repository: TalkLangageRepositoryPort,
    private readonly validator: GetTalkLangageValidator,
  ) { }

  async execute(query: GetTalkLangageQuery): Promise<TalkLangageEntity | null> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.USER_NOT_FOUND);
    }

    return entity;
  }
}
