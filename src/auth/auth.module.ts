import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { USERS_CLIENT } from 'src/common/constants';
import { ClientConfigService } from 'src/client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from 'src/client-config/client-config.module';

@Module({
  imports: [ClientConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: USERS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.userClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
  exports: [AuthService, USERS_CLIENT],
})
export class AuthModule {}
