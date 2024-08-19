import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isEnabled: boolean;

  @Prop()
  image: string;

  @Prop({ default: 'User' })
  role: UserRoles;
}

export enum UserRoles {
  admin = 'Admin',
  user = 'User',
}

export const UserSchema = SchemaFactory.createForClass(User);
