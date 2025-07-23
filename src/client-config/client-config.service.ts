import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
  constructor(private readonly config: ConfigService) {}

  getUserClientPort(): number {
    return this.config.get<number>('USER_CLIENT_PORT', 8080);
  }

  getUserClientHost(): string {
    return this.config.get<string>('USER_CLIENT_HOST', 'localhost');
  }

  get userClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getUserClientPort(),
        host: this.getUserClientHost(),
      },
    };
  }
}
