import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// make scrypt awaitable
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // make sure user not exist yet
    const users = await this.userService.find(email);
    if (users?.length) {
      throw new BadRequestException('email is use');
    }

    // hash the user password
    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // has the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hash and salt together
    const hashedSaltedPassword = `${salt}.${hash.toString('hex')}`;

    // create the new user
    const user = await this.userService.create(email, hashedSaltedPassword);

    return user;
  }

  async signin(email: string, password: string) {
    // make sure user not exist yet
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('email not found');
    }

    const [salt, storedHash] = user.password.split('.');

    // has the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
