import { LevelEnum } from "../enums/level.enum";

export interface TalkLangageProps {
    readonly id?: string;
    publicId: string;
    name: string;
    stage: LevelEnum
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class TalkLangageEntity {
    constructor(private readonly props: TalkLangageProps) {}

    get publicId(): string {
        return this.props.publicId;
    }

    get name(): string {
        return this.props.name;
    }

    get stage(): LevelEnum {
        return this.props.stage;
    }

    update(updates: Partial<TalkLangageProps>): TalkLangageEntity {
        return new TalkLangageEntity({...this.props, ...updates})
    }
}