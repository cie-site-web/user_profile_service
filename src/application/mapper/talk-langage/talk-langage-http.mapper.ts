// application/mapper/talk-langage-http.mapper.ts

import { GetTalkLangageDto } from "src/application/dto/talk-langage/get-talk-langage.dto";
import { ListTalkLangageDto } from "src/application/dto/talk-langage/list-talk-langage.dto";
import { ResponseTalkLangageDto } from "src/application/dto/talk-langage/response-talk-langage.dto";
import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { CreateTalkLangageCommand } from "src/domain/port/in/talk-langage/create-talk-langage.interface.port";
import { GetTalkLangageQuery, GetTalkLangageResponse } from "src/domain/port/in/talk-langage/get-talk-langage.interface.port";
import { ListTalkLangageQuery } from "src/domain/port/in/talk-langage/list-talk-langage.interface.port";

export class TalkLangageHttpMapper {
  static toCreateCommand(dto: CreateTalkLangageCommand): CreateTalkLangageCommand {
    return {
      publicId: dto.publicId,
      name: dto.name,
      stage: dto.stage,
    };
  }

  static toGetQuery(dto: GetTalkLangageDto): GetTalkLangageQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListTalkLangageDto): ListTalkLangageQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      name: dto.name,
      stage: dto.stage,
    };
  }

  static toResponse(entity: TalkLangageEntity): ResponseTalkLangageDto {
    return {
      publicId: entity.publicId,
      name: entity.name,
      stage: entity.stage,
    };
  }
}
