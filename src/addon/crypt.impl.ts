import { Crypt } from './crypt';
import { compareSync, hash } from 'bcrypt';



export class CryptImpl extends Crypt {
  async hashPassword(password: string): Promise<string> {
    try {
      return await hash(password, 10);
    } catch (error) {
      console.log('Error hashing password', error);
    }
  }

  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }}
