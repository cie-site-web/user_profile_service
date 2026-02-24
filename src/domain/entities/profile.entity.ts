export interface ProfileProps {
    readonly id?: string;
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
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class ProfileEntity {
    constructor(private readonly props: ProfileProps) {}

    get publicId(): string {
        return this.props.publicId;
    }

    get userId(): string {
        return this.props.userId;
    }

    get lastName(): string {
        return this.props.lastName;
    }

     get firstName(): string {
        return this.props.firstName;
    }

    get phone(): string {
        return this.props.phone;
    }

    get address(): string {
        return this.props.address;
    }
    get birth(): Date {
        return this.props.birth;
    }

    get whatsApp(): string {
        return this.props.whatsApp;
    }
    
    get linkedinUrl(): string|null {
        return this.props.linkedinUrl||null;
    }

    get githubUrl(): string|null {
        return this.props.githubUrl||null;
    }

    get avatarUrl(): string|null {
        return this.props.avatarUrl||null;
    }
   
    update(updates: Partial<ProfileProps>): ProfileEntity {
        return new ProfileEntity({...this.props, ...updates})
    }
}