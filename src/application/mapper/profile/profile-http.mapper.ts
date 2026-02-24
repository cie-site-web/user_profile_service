// src/application/mapper/profile-http.mapper.ts

import { CreateProfileDto } from "src/application/dto/profile/create-profile.dto";
import { GetProfileDto } from "src/application/dto/profile/get-profile.dto";
import { ListProfileDto } from "src/application/dto/profile/list-profile.dto";
import { ResponseProfileDto } from "src/application/dto/profile/response-profile.dto";
import { ProfileEntity } from "src/domain/entities/profile.entity";
import { CreateProfileCommand } from "src/domain/port/in/profile/create-profile.interface.port";
import { GetProfileQuery } from "src/domain/port/in/profile/get-profile.interface.port";
import { ListProfileQuery } from "src/domain/port/in/profile/list-profile.interface.port";

export class ProfileHttpMapper {
  static toCreateCommand(dto: CreateProfileDto): CreateProfileCommand {
    return {
      publicId: dto.publicId,
      userId: dto.userId,
      lastName: dto.lastName,
      firstName: dto.firstName,
      phone: dto.phone,
      address: dto.address,
      birth: dto.birth,
      whatsApp: dto.whatsApp,
      linkedinUrl: dto.linkedinUrl,
      githubUrl: dto.githubUrl,
      avatarUrl: dto.avatarUrl,
    };
  }

  static toGetQuery(dto: GetProfileDto): GetProfileQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListProfileDto): ListProfileQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      userId: dto.userId,
      lastName: dto.lastName,
      firstName: dto.firstName,
      address: dto.address,
      birth: dto.birth,
    };
  }

  static toResponse(entity: ProfileEntity): ResponseProfileDto {
    return {
      publicId: entity.publicId,
      userId: entity.userId,
      lastName: entity.lastName,
      firstName: entity.firstName,
      phone: entity.phone,
      address: entity.address,
      birth: entity.birth,
      whatsApp: entity.whatsApp,
      linkedinUrl: entity.linkedinUrl,
      githubUrl: entity.githubUrl,
      avatarUrl: entity.avatarUrl,
    };
  }
}
