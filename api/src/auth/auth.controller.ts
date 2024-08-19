import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const foundUser = await this.authService.getUserViaEmail(signInDto.email);
    if (!foundUser)
      throw new NotFoundException('Invalid email', {
        cause: new Error(),
        description: 'Invalid Email',
      });

    const passMatch = bcrypt.compareSync(
      signInDto.password,
      foundUser.password,
    );

    if (passMatch) {
      return {
        tokens: await this.authService.getTokens(foundUser.id, foundUser.role),
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          image: foundUser.image,
        },
      };
    } else {
      throw new UnauthorizedException('Invalid Password');
    }
  }
}
