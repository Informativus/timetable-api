import { IsOptional, IsString } from 'class-validator';

export class GetReplacementDTO {
  @IsString()
  group: string;

  @IsOptional()
  @IsString()
  date?: string;
}
