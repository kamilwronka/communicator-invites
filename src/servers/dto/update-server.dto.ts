import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateServerDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
