import { IsString } from 'class-validator';

export class TimetableDto {
  @IsString()
  groupId: string;
}
