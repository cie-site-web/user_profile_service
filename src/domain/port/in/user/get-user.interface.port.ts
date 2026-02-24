import { UserEntity } from "src/domain/entities/user.entity";
import { StatusEnum } from "src/domain/enums/status.enum";

export interface GetUserQuery {
    publicId: string;
}

export interface GetUserResponse {
    publicId: string;
    email: string;
    status: StatusEnum;
}

export interface GetUserInterfacePort {
    execute(query: GetUserQuery): Promise<UserEntity | null>
}