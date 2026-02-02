import CreateUser from '../dto/create-user.dto';
import User from '../user.entity';

export abstract class UserRepository {
  abstract createUser(newUser: CreateUser): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract getAll(): Promise<User[]>;
}
