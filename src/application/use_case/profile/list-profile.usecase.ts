import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { listProfileInterfacePort, ListProfileQuery } from "src/domain/port/in/profile/list-profile.interface.port";
import { listUserInterfacePort, ListUserQuery } from "src/domain/port/in/user/list-user.interface.port";
import { ProfileRepositoryPort } from "src/domain/port/out/profile.repository.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";

export class ListProfileUseCase implements listProfileInterfacePort {

  constructor(
    private readonly repository: ProfileRepositoryPort,
  ) {}

  async execute(query: ListProfileQuery): Promise<PaginatedResponse<ProfileEntity>> {

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
