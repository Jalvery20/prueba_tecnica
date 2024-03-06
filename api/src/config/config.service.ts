// src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get dbConnection(): string {
    return this.configService.get<string>('MONGODB_CLOUD');
  }
}
