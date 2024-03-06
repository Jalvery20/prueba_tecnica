// auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<{
    status: string;
    message: string;
  }> {
    const { password, ...userData } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con la contraseña hasheada
    const userDocument = await this.usersService.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Convertir el documento de Mongoose en un objeto plano
    const user = userDocument.toObject();

    // Eliminar el campo password del objeto
    delete user.password;

    // Devolver el usuario sin el atributo password
    return {
      status: 'Success',
      message: 'Usuario creado correctamente',
    };
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<{
    token: string;
    expiration: string;
    userid: string;
    username: string;
  }> {
    const user = await this.usersService.getUserByName(username);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }
    // Generar token JWT
    const { token, expiration } = await this.generateJwtToken(user.id);

    return { token, expiration, userid: user.id, username: user.username };
  }

  async generateJwtToken(
    userId: string,
  ): Promise<{ token: string; expiration: string }> {
    const payload = { userId };

    const options = {
      expiresIn: '30d',
    };

    try {
      const token = this.jwtService.sign(payload, options);
      const decodedToken = this.jwtService.decode(token);
      const expiration = decodedToken.exp;
      // Convertir la fecha de expiración a una cadena ISO para facilitar su lectura
      return { token, expiration: new Date(expiration * 1000).toISOString() };
    } catch (error) {
      throw error;
    }
  }
}
