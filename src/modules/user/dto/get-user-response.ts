import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Expose()
  email: string;
}
