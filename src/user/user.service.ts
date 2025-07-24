import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USERS_CLIENT } from 'src/common/constants';
import { USER_PATTERN } from 'src/user/patterns';
import { CreateUserDto } from './dto';
import { MicroserviceErrorHandler } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(@Inject(USERS_CLIENT) private readonly userClient: ClientProxy) {}

  async findAll() {
    const users = await firstValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.userClient.send(USER_PATTERN.FIND_ALL, {}),
      ),
    );
    return users;
  }

  async create(input: CreateUserDto) {
    const user = await firstValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.userClient.send(USER_PATTERN.CREATE, input),
      ),
    );
    return user;
  }
}
