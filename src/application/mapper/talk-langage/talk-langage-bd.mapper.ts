// application/mapper/talk-langage-bd.mapper.ts

import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";

export class TalkLangageDbMapper {
  static toDomain(row: any): TalkLangageEntity {
    return new TalkLangageEntity({
      publicId: row.public_id,
      name: row.name,
      stage: row.stage
    })
  };

  static toPersistence(entity: TalkLangageEntity): any {
    return {
      public_id: entity.publicId,
      name: entity.name,
      stage: entity.stage
    };
  }
}