import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserEntity } from "src/domain/entities/user.entity";
import { GetUserInterfacePort, GetUserQuery } from "src/domain/port/in/user/get-user.interface.port";
import { UserRepositoryPort } from "src/domain/port/out/user.repository.port";
import { GetUserValidator } from "src/domain/service/validators/user/get-user.validator";

export class GetUserUseCase implements GetUserInterfacePort {

  constructor(
    private readonly repository: UserRepositoryPort,
    private readonly validator: GetUserValidator,
  ) { }

  async execute(query: GetUserQuery): Promise<UserEntity | null> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.USER_NOT_FOUND);
    }

    return entity;
  }
}
