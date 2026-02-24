import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { CreateProfileCommand, CreateProfileInterfacePort } from "src/domain/port/in/profile/create-profile.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { ProfileRepositoryPort } from "src/domain/port/out/profile.repository.port";
import { CreateProfileValidator } from "src/domain/service/validators/profile/create-profile.validator";


export class CreateProfileUseCase implements CreateProfileInterfacePort {

  constructor(
    private readonly repository: ProfileRepositoryPort,
    private readonly validator: CreateProfileValidator,
    private readonly PublicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreateProfileCommand): Promise<ProfileEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByPublicId(command.publicId);
    if (existing) {
      throw new ApplicationError(CodesError.DUPLICATE_PROFILE);
    }

    const publicId = this.PublicIdGenerator.generate();

    const profile = new ProfileEntity({
      publicId: publicId,
      userId: command.userId,
      lastName: command.lastName,
      firstName: command.firstName,
      phone: command.phone,
      address: command.address,
      birth: command.birth,
      whatsApp: command.whatsApp,
      githubUrl: command.githubUrl,
      linkedinUrl: command.linkedinUrl,
      avatarUrl: command.avatarUrl,
    });

    return this.repository.save(profile);
  }
}
