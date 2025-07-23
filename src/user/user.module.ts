import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientConfigModule } from 'src/client-config/client-config.module';
import { USERS_CLIENT } from 'src/common/constants';
import { ClientConfigService } from 'src/client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [ClientConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USERS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.userClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
  exports: [UserService, USERS_CLIENT],
})
export class UserModule {}
