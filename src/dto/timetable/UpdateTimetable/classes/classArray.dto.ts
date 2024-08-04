import { IsString } from 'class-validator';

export class ClassArray {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
