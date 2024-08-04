import { IsString } from 'class-validator';

export class PeriodArray {
  @IsString()
  name: string;

  @IsString()
  starttime: string;

  @IsString()
  endtime: string;
}
