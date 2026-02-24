export interface DeleteUserCommand {
    publicId: string;
}

export interface DeleteUserInterfacePort {
    execute(command: DeleteUserCommand): Promise<void>
}