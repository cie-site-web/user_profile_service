import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProfileEntity } from "src/domain/entities/profile.entity";

export interface ListProfileQuery {
    page: number;
    limit: number;
    userId?: string;
    lastName?: string;
    firstName?: string;
    address?: string;
    birth?: Date;
}

export interface listProfileInterfacePort {
    execute(query: ListProfileQuery): Promise<PaginatedResponse<ProfileEntity>>
}