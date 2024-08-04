import { IsString } from 'class-validator';

export class GroupArray {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
