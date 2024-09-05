import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';

export type TReplacementData = {
  date: Date;
  replacement: CreateReplacementDto;
};
