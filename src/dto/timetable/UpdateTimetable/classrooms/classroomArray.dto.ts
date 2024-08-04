import { IsString } from 'class-validator';

export class ClassroomArray {
  @IsString()
  id: string;

  @IsString()
  short: string;
}
