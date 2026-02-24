// src/application/mapper/profile-bd.mapper.ts

import { ProfileEntity } from "src/domain/entities/profile.entity";

export class ProfileDbMapper {
  static toDomain(row: any): ProfileEntity {
    return new ProfileEntity({
      publicId: row.public_id,
      userId: row.user_id,
      lastName: row.last_name,
      firstName: row.first_name,
      phone: row.phone,
      address: row.address,
      birth: row.birth,
      whatsApp: row.whats_app,
      linkedinUrl: row.linkedlin_url,
      githubUrl: row.github_url,
      avatarUrl: row.avatar_url,
    })
  };

  static toPersistence(entity: ProfileEntity): any {
    return {
      public_id: entity.publicId,
      user_id: entity.userId,
      last_name: entity.lastName,
      first_name: entity.firstName,
      phone: entity.phone,
      address: entity.address,
      birth: entity.birth,
      whats_app: entity.whatsApp,
      linkedlin_url: entity.linkedinUrl,
      github_url: entity.githubUrl,
      avatar_url: entity.avatarUrl,
    };
  }
}