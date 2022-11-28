import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Document } from 'mongoose';

export type InviterDocument = Inviter & Document;
export type InviteDocument = Invite & Document;

@Schema({ _id: false })
export class Server {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Expose()
  username?: string;
  @ApiProperty()
  @Expose()
  avatar?: string;
}

@Schema({ _id: false })
export class Inviter {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Expose()
  icon?: string;
  @ApiProperty()
  @Expose()
  name?: string;
}

@Schema({ timestamps: true })
export class Invite {
  @ApiProperty()
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @ApiProperty()
  @Prop()
  maxAge: number;

  @ApiProperty()
  @Prop()
  maxUses: number;

  @ApiProperty()
  @Type(() => Server)
  @Prop({ type: Server })
  server: Server;

  @ApiProperty()
  @Type(() => Inviter)
  @Prop({ type: Inviter })
  inviter: Inviter;

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
