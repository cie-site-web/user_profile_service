
export interface ProfileTalkLangageProps {
    readonly id?: string;
    publicId: string;
    profileId: string;
    talkLangageId: string
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class ProfileTalkLangageEntity {
    constructor(private readonly props: ProfileTalkLangageProps) {}

    get publicId(): string {
        return this.props.publicId;
    }

    get profileId(): string {
        return this.props.profileId;
    }

    get talkLangageId(): string {
        return this.props.talkLangageId;
    }

    update(updates: Partial<ProfileTalkLangageProps>): ProfileTalkLangageEntity {
        return new ProfileTalkLangageEntity({...this.props, ...updates})
    }
}