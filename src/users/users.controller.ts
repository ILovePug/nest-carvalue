import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userSerivce: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userSerivce.create(body.email, body.password);
  }
}
