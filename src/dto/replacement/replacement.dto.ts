import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ReplacementDto {
  @IsNumber()
  index: number;

  @IsBoolean()
  cancelled: boolean;

  @IsString()
  teacher: string;

  @IsString()
  room: string;

  @IsString()
  title: string;

  @IsString()
  class: string;

  @IsString()
  teacher_original: string;
}
