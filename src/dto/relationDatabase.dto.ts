import { IsArray, IsString } from 'class-validator';

export class RelationDatabaseDto {
  @IsString()
  text: string;
  @IsArray()
  values: any[];
}
