export interface DeleteProfileCommand {
    publicId: string;
}

export interface DeleteProfileInterfacePort {
    execute(command: DeleteProfileCommand): Promise<void>
}