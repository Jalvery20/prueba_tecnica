import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.dto';

@Controller('api/Authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body(ValidationPipe) registeUserDto: RegisterUserDto,
  ): Promise<{
    status: string;
    message: string;
  }> {
    try {
      const user = await this.authService.registerUser(registeUserDto);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('La dirección de correo o el nombre de usuario ya están registrados');
      }
      throw error;
    }
  }

  @Post('login')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{
    token: string;
    expiration: string;
    userid: string;
    username: string;
  }> {
    try {
      const user = await this.authService.loginUser(username, password);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuario no encontrado');
      } else {
        throw new NotFoundException('Credenciales inválidas');
      }
    }
  }
}
