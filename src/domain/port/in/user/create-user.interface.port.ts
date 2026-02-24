import { UserEntity } from "src/domain/entities/user.entity";
import { StatusEnum } from "src/domain/enums/status.enum";

export interface CreateUserCommand {
    publicId: string;
    email: string;
    password: string;
    status: StatusEnum;
}

export interface CreateUserInterfacePort {
    execute(command: CreateUserCommand): Promise<UserEntity>;
}