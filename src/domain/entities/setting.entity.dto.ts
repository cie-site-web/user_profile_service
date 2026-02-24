import { LangageEnum } from "../enums/langage.enum";
import { ThemeEnum } from "../enums/theme.enum";

export interface SettingProps {
    readonly id?: string;
    publicId: string;
    profileId: string;
    langage: LangageEnum;
    theme: ThemeEnum;
    notificationEmailEnable: boolean;
    notificationSmsEnable: boolean;
    twoFactorAuthEnable: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class SettingEntity {
    constructor(private readonly props: SettingProps) {}

    get publicId(): string {
        return this.props.publicId;
    }

    get profileId(): string {
        return this.props.profileId;
    }

    get langage(): LangageEnum {
        return this.props.langage;
    }

    get theme(): LangageEnum {
        return this.props.langage;
    }

    get notificationEmailEnable(): boolean {
        return this.props.notificationEmailEnable;
    }

    get notificationSmsEnable(): boolean {
        return this.props.notificationSmsEnable;
    }

    get twoFactorAuthEnable(): boolean {
        return this.props.twoFactorAuthEnable;
    }

    update(updates: Partial<SettingProps>): SettingEntity {
        return new SettingEntity({...this.props, ...updates})
    }
}