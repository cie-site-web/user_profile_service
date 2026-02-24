export interface DeleteTalkLangageCommand {
    publicId: string;
}

export interface DeleteTalkLangageInterfacePort {
    execute(command: DeleteTalkLangageCommand): Promise<void>
}