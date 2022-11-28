import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  validate?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maxAge: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maxUses: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  inviterId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  serverId: string;
}
