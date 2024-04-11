export abstract class Crypt {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePassword(password: string, hash: string): boolean;
}
