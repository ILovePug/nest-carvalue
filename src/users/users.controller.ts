import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userSerivce: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userSerivce.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userSerivce.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userSerivce.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const deletedUser = await this.userSerivce.remove(parseInt(id));
    if (!deletedUser) {
      throw new NotFoundException('user not found');
    }
    return deletedUser;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.userSerivce.update(parseInt(id), body);
    if (!updatedUser) {
      throw new NotFoundException('user not found');
    }

    return updatedUser;
  }
}
