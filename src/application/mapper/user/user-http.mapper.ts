// application/mapper/user-http.mapper.ts

import { CreateUserDto } from "src/application/dto/user/create-user.dto";
import { GetUserDto } from "src/application/dto/user/get-user.dto";
import { ListUserDto } from "src/application/dto/user/list-user.dto";
import { ResponseUserDto } from "src/application/dto/user/response-user.dto";
import { UpdateUserDto } from "src/application/dto/user/update-user.dto";
import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserCommand } from "src/domain/port/in/user/create-user.interface.port";
import { GetUserQuery, GetUserResponse } from "src/domain/port/in/user/get-user.interface.port";
import { ListUserQuery } from "src/domain/port/in/user/list-user.interface.port";
import { UpdateUserCommand } from "src/domain/port/in/user/update-user.interface.port";

export class UserHttpMapper {
  static toCreateCommand(dto: CreateUserDto): CreateUserCommand {
    return {
      publicId: dto.publicId,
      email: dto.email,
      password: dto.password,
      status: dto.status,
    };
  }

  static toUpdateCommand(dto: UpdateUserDto): UpdateUserCommand {
    return {
      email: dto.email,
      password: dto.password,
      status: dto.status,
    };
  }

  static toGetQuery(dto: GetUserDto): GetUserQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListUserDto): ListUserQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      status: dto.status,
      email: dto.email,
    };
  }

  static toResponse(entity: UserEntity): ResponseUserDto {
    return {
      publicId: entity.publicId,
      email: entity.email,
      status: entity.status,
    };
  }
}
