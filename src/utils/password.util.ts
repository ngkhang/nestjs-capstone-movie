import * as bcrypt from 'bcrypt';

/**
 * PasswordService provides methods for hashing and comparing passwords using the bcrypt library.
 * @link https://docs.nestjs.com/security/encryption-and-hashing
 */
class PasswordService {
  private readonly saltRounds: number = 10;

  /**
   * Hashes a plain text password.
   * @param data The plain text password to hash.
   * @returns A Promise that resolves to the hashed password.
   * @throws Will log an error if hashing fails.
   */
  async hashing(data: string): Promise<string> {
    try {
      return bcrypt.hashSync(data, this.saltRounds);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param plainPassword The plain text password to compare.
   * @param hashPassword The hashed password to compare against.
   * @returns A Promise that resolves to a boolean indicating whether the passwords match.
   * @throws Will log an error if comparison fails.
   */
  async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    try {
      return bcrypt.compareSync(plainPassword, hashPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }
}

export const passwordService = new PasswordService();
