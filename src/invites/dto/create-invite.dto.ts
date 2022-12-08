import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  validate?: string;

  @ApiProperty()
  @IsNumber()
  maxAge: number;

  @ApiProperty()
  @IsNumber()
  maxUses: number;

  @ApiProperty()
  @IsString()
  inviterId: string;

  @ApiProperty()
  @IsMongoId()
  serverId: string;
}
