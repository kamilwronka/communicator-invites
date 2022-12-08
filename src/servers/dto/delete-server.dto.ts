import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteServerDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
