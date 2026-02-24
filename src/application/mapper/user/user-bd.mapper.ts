// application/mapper/user-bd.mapper.ts

import { UserEntity } from "src/domain/entities/user.entity";

export class UserDbMapper {
  static toDomain(row: any): UserEntity {
    return new UserEntity({
      publicId: row.public_id,
      email: row.email,
      password: row.password,
      status: row.status,
    })
  };


  static toPersistence(entity: UserEntity): any {
    return {
      public_id: entity.props.publicId,
      email: entity.props.email,
      password: entity.props.password,
      status: entity.props.status,
    };
  }
}
