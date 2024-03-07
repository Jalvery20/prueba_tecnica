import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: "mongodb+srv://jalvery20:3Hp6UXqVrHDkoRfj@mantclientes.arpwrqm.mongodb.net/?retryWrites=true&w=majority&appName=mantclientes",
      }),
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    InterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
