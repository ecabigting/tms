import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class AccessToken {
  @Prop()
  accessToken: string;
  @Prop({ type: Date })
  accessTokenExp: Date;
  @Prop()
  refreshToken: string;
  @Prop({ type: Date })
  refreshTokenExp: Date;
  @Prop()
  userId: string;
  @Prop()
  isEnabled: boolean;
}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
