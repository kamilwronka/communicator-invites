import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Server } from '../../servers/schemas/server.schema';
import { User } from '../../users/schemas/user.schema';

export type InviteDocument = Invite & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Invite {
  @Exclude()
  _id: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  @Prop()
  maxAge: number;

  @ApiProperty()
  @Prop()
  maxUses: number;

  @Exclude()
  @Prop({ type: String })
  serverId: string;

  @ApiProperty()
  @Type(() => Server)
  server: Server;

  @Exclude()
  @Prop({ type: String })
  inviterId: string;

  @ApiProperty()
  @Type(() => User)
  inviter: User;

  @Exclude()
  createdAt?: string;

  @Exclude()
  updatedAt?: string;

  @Exclude()
  __v: number;

  constructor(partial: Partial<Invite>) {
    Object.assign(this, partial);
  }
}

export const InviteSchema = SchemaFactory.createForClass(Invite);

InviteSchema.virtual('inviter', {
  ref: User.name,
  localField: 'inviterId',
  foreignField: 'userId',
  justOne: true,
});

InviteSchema.virtual('server', {
  ref: Server.name,
  localField: 'serverId',
  foreignField: 'serverId',
  justOne: true,
});
