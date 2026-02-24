import { TalkLangageEntity } from "src/domain/entities/talk-langage.entity";
import { ListTalkLangageQuery } from "../in/talk-langage/list-talk-langage.interface.port";

export interface TalkLangageRepositoryPort {

    save(user: TalkLangageEntity): Promise<TalkLangageEntity>;

    findByPublicId(publicId: string): Promise<TalkLangageEntity | null>;

    findWithPagination(query: ListTalkLangageQuery): Promise<{ data: TalkLangageEntity[]; total: number }>;

    delete(publicId: string): Promise<void>
}