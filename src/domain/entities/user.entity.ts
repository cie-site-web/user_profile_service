import { StatusEnum } from "../enums/status.enum";

export interface UserProps {
    readonly id?: bigint;
    publicId: string;
    email: string;
    password: string;
    status: StatusEnum
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class UserEntity {
    constructor(public readonly props: UserProps) {}

    get publicId(): string {
        return this.props.publicId;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    get status(): StatusEnum {
        return this.props.status;
    }

    update(updates: Partial<UserProps>): UserEntity {
        return new UserEntity({ ...this.props, ...updates });
    }
}