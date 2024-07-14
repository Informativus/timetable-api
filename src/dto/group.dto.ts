import { IsString } from 'class-validator';

export class GroupDto {
  @IsString()
  textId: string;
}
