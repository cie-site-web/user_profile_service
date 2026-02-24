import { UserEntity } from "src/domain/entities/user.entity";
import { ListUserQuery } from "../in/user/list-user.interface.port";

export interface UserRepositoryPort {

    save(user: UserEntity): Promise<UserEntity>;

    findByPublicId(publicId: string): Promise<UserEntity | null>;

    findByEmail(email: string): Promise<UserEntity | null>;

    findWithPagination(query: ListUserQuery): Promise<{ data: UserEntity[]; total: number }>;

    delete(publicId: string): Promise<void>
}