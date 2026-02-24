import { ProfileEntity } from "src/domain/entities/profile.entity";
import { ListProfileQuery } from "../in/profile/list-profile.interface.port";

export interface ProfileRepositoryPort {

    save(user: ProfileEntity): Promise<ProfileEntity>;

    findByPublicId(publicId: string): Promise<ProfileEntity | null>;

    findWithPagination(query: ListProfileQuery): Promise<{ data: ProfileEntity[]; total: number }>;

    delete(publicId: string): Promise<void>
}