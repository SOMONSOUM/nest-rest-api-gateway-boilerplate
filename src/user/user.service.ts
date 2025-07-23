import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USERS_CLIENT } from 'src/common/constants';
import { USER_PATTERN } from 'src/user/patterns';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@Inject(USERS_CLIENT) private readonly userClient: ClientProxy) {}

  async findAll() {
    return await firstValueFrom(
      this.userClient.send(USER_PATTERN.FIND_ALL, {}),
    );
  }

  async create(input: CreateUserDto) {
    return await firstValueFrom(
      this.userClient.send(USER_PATTERN.CREATE, input),
    );
  }
}
