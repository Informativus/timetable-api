import { IsString } from 'class-validator';

export class TeacherArray {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
