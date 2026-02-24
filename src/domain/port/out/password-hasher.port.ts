export interface PasswordHasherPort {
  hash(value: string): Promise<string>;
  compare(value: string, hashed: string): Promise<boolean>;
}
