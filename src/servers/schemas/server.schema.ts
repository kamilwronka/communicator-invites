import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ServerDocument = Server & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, id: false })
export class Server {
  @Exclude()
  _id?: string;

  @Exclude()
  @Prop({ type: String, index: true, unique: true, required: true, trim: true })
  serverId: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ default: null })
  icon?: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  @Exclude()
  __v: number;

  constructor(partial: Partial<Server>) {
    Object.assign(this, partial);
  }
}

export const ServerSchema = SchemaFactory.createForClass(Server);

ServerSchema.virtual('id').get(function () {
  return this.serverId;
});
