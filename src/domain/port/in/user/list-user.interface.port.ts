import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { StatusEnum } from "src/domain/enums/status.enum";

export interface ListUserQuery {
    page: number;          
    limit: number;         
    status?: StatusEnum;       
    email?: string;
}


export interface listUserInterfacePort {
    execute(query: ListUserQuery): Promise<PaginatedResponse<UserEntity>>
}