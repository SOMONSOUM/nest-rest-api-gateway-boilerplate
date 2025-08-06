import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_CLIENT } from 'src/common/constants';
import { LoginDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { MicroserviceErrorHandler } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(@Inject(USERS_CLIENT) private readonly userClient: ClientProxy) {}

  async login(input: LoginDto) {
    const tokens = await firstValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.userClient.send('auth.login', input),
      ),
    );

    return tokens;
  }
}
