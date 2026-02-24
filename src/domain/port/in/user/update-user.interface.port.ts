import { UserEntity } from "src/domain/entities/user.entity";
import { StatusEnum } from "src/domain/enums/status.enum";
import { GetUserQuery } from "./get-user.interface.port";

export interface UpdateUserCommand {
    email?: string;
    password?: string;
    status?: StatusEnum;
}

export interface UpdateUserInterfacePort {
    execute(query: GetUserQuery, command: UpdateUserCommand): Promise<UserEntity>
}