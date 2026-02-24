import { ProfileEntity } from "src/domain/entities/profile.entity";

export interface GetProfileQuery {
    publicId: string;
}

export interface GetProfileResponse {
    publicId: string;
    userId: string;
    lastName: string;
    firstName: string;
    phone: string;
    address: string;
    birth: Date;
    whatsApp: string;
    linkedinUrl?: string;
    githubUrl?: string;
    avatarUrl?: string;
}

export interface GetProfileInterfacePort {
    execute(query: GetProfileQuery): Promise<ProfileEntity | null>
}