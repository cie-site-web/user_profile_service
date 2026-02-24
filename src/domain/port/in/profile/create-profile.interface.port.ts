import { ProfileEntity } from "src/domain/entities/profile.entity";

export interface CreateProfileCommand {
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

export interface CreateProfileInterfacePort {
    execute(command: CreateProfileCommand): Promise<ProfileEntity>;
}