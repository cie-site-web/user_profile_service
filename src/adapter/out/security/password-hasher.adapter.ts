import * as bcrypt from 'bcrypt';
import { PasswordHasherPort } from 'src/domain/port/out/password-hasher.port';

export class BcryptPasswordHasherAdapter implements PasswordHasherPort {

  async hash(value: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(value, saltRounds);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
