import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto';
import { Response } from 'src/common/utils';

@ApiTags('User')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return Response.success({
      message: 'Users retrieved successfully',
      data: users,
    });
  }

  @Post('create')
  async create(@Body() input: CreateUserDto) {
    return Response.success({
      message: 'User created successfully',
      data: await this.userService.create(input),
    });
  }
}
