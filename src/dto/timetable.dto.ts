import { IsString } from 'class-validator';

export class TimetableDto {
  @IsString()
  groupTextId: string;
}
