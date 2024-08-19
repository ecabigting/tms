import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 11);
    // TODO: Implement Email Authentication
    return await newUser.save().then((u) => {
      const newObject = u.toObject();
      delete newObject.password;
      return newObject;
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).select('-password');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
