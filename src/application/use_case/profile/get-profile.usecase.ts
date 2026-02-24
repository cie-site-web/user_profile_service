import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { GetProfileInterfacePort, GetProfileQuery } from "src/domain/port/in/profile/get-profile.interface.port";
import { ProfileRepositoryPort } from "src/domain/port/out/profile.repository.port";
import { GetProfileValidator } from "src/domain/service/validators/profile/get-profile.validator";


export class GetProfileUseCase implements GetProfileInterfacePort {

  constructor(
    private readonly repository: ProfileRepositoryPort,
    private readonly validator: GetProfileValidator,
  ) { }

  async execute(query: GetProfileQuery): Promise<ProfileEntity | null> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.PROFILE_NOT_FOUND);
    }

    return entity;
  }
}
