import { IsMongoId, IsString } from 'class-validator';

export class InviteParamsDto {
  @IsString()
  @IsMongoId()
  id: string;
}
