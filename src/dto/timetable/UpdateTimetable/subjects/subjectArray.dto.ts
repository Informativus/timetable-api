import { IsString } from 'class-validator';

export class SubjectArrayDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
