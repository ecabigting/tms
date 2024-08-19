import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRoles } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto } from './dto/signIn.dto';
import { AccessToken } from './entities/accessToken.entity';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AccessToken.name) private accessTokenModel: Model<AccessToken>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const foundUser = this.userModel.find({
      where: { email: signInDto.email },
    });
  }

  async getUserViaEmail(email: string) {
    return await this.userModel.findOne().where({ email: email });
  }

  async getTokens(userId: string, role: UserRoles) {
    const exp = new Date(new Date().getTime() + +process.env.TOKEN_EXP * 1000);
    const refExp = new Date(
      new Date().getTime() + +process.env.REFRESH_EXP * 1000,
    );
    const tokenPayload = {
      sub: userId,
      role: role,
    };
    // console.log({ tokenPayload });
    const access_token = await this.jwtService.signAsync(tokenPayload);
    const newToken = new this.accessTokenModel({
      accessToken: access_token,
      accessTokenExp: exp,
      isEnabled: true,
      refreshToken: randomUUID().toString(),
      refreshTokenExp: refExp,
      userId: userId,
    });

    return await newToken.save();
  }
}
