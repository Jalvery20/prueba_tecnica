import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado `);
    }
    return user;
  }

  async getUserByName(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(
        `Usuario con nombre: ${username} no encontrado`,
      );
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async registerAdminUser(): Promise<User> {
    const username = 'admin';
    const email = 'admin@gmail.com';
    const password = 'Admin4321';

    return this.createUser({ username, email, password });
  }
}
