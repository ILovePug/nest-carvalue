import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    // create fake copy of user service
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const newUser = {
          id: Math.floor(Math.random() * 2323),
          email,
          password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        // if anyone ask for UsersSerivce, give fakeUsersService
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  it('should create a new user with a salted and hased password', async () => {
    const user = await authService.signup('1234@yahoo.com', '111');
    expect(user.password).not.toEqual('111');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user signed up with email already in use', async () => {
    await authService.signup('1232@yahoo.com', 'sdfs');
    try {
      await authService.signup('1232@yahoo.com', 'sdfs');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('should throws not found when entering unused email', async () => {
    try {
      await authService.signin('1232@yahoo.com', 'sdfs');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should throws if an invalid password is provided', async () => {
    await authService.signup('1232@yahoo.com', '1');
    try {
      await authService.signin('1232@yahoo.com', '2');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('should return a user if correct password is provided', async () => {
    await authService.signup('1232@yahoo.com', 'sd');
    const user = await authService.signin('1232@yahoo.com', 'sd');
    expect(user).toBeDefined();
  });
});
