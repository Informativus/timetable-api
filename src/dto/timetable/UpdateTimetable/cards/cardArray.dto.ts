import { IsString } from 'class-validator';

export class CardArray {
  @IsString()
  lessonid: string;

  @IsString()
  period: string;

  @IsString()
  weeks: string;

  @IsString()
  days: string;
}
