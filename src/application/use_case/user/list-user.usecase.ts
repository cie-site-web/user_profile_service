import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { listUserInterfacePort, ListUserQuery } from "src/domain/port/in/user/list-user.interface.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";

export class ListUserUseCase implements listUserInterfacePort {

  constructor(
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(query: ListUserQuery): Promise<PaginatedResponse<UserEntity>> {

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
