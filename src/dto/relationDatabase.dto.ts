import { IsArray, IsString } from 'class-validator';

export class RelationDatabaseDto<T> {
  @IsString()
  text: string;
  @IsArray()
  values: T[];
}
