import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { listTalkLangageInterfacePort, ListTalkLangageQuery } from "src/domain/port/in/talk-langage/list-talk-langage.interface.port";
import { TalkLangageRepositoryPort } from "src/domain/port/out/talk-langage.repository.port";

export class ListTalkLangageUseCase implements listTalkLangageInterfacePort {

  constructor(
    private readonly repository: TalkLangageRepositoryPort,
  ) {}

  async execute(query: ListTalkLangageQuery): Promise<PaginatedResponse<TalkLangageEntity>> {

    const { data, total } = await this.repository.findWithPagination(query);

    const totalPages = Math.ceil(total / query.limit);

    return {
      data,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
  }
}
