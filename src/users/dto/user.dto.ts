import { Expose } from 'class-transformer';

// outgoing dto
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
