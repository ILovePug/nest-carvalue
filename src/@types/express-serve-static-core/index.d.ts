import { User } from '../../users/users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      session?: {
        userId?: number;
      };
    }
  }
}
