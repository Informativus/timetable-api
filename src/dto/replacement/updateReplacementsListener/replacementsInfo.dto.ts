import { IsOptional, IsString } from 'class-validator';

export class ReplacementsInfoDto {
  @IsString()
  absent: string;

  @IsString()
  lesson: string;

  @IsString()
  subject: string;

  @IsString()
  forms: string;

  @IsString()
  groups: string;

  @IsString()
  @IsOptional()
  substituting?: string;

  @IsString()
  @IsOptional()
  subst_type?: string;

  @IsString()
  @IsOptional()
  cancelled?: string;

  @IsString()
  note: string;

  @IsString()
  room: string;
}
