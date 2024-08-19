import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  accessToken: string;
  @IsDate()
  @Type(() => Date)
  accessTokenExp: Date;
  @IsString()
  refreshToken: string;
  @IsDate()
  @Type(() => Date)
  refreshTokenExp: Date;
}
