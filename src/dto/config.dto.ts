import { IsString } from 'class-validator';

export class ConfigDto {
  @IsString()
  property: string;
}
