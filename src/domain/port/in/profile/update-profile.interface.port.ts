import { ProfileEntity } from "src/domain/entities/profile.entity";

export interface UpdateProfileCommand {
    publicId: string;
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

export interface UpdateProfileInterfacePort {
    execute(command: UpdateProfileCommand): Promise<ProfileEntity>
}