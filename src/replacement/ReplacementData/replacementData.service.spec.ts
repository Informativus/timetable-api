import { ReplacementData } from './replacementData.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IGetReplaceWithDate } from '../repositories/Interfaces/IGetReplaceWithDate.interface';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import {
  GET_GROUP_WITH_DATA,
  GET_REPLACEMENTS_WITH_DATE,
} from 'src/config/constants/constants';

describe('ReplacementData', () => {
  let service: ReplacementData;

  let mockReplacementRepository: Partial<IGetReplaceWithDate>;
  let mockGroupService: Partial<IGetGroupWithData>;

  beforeEach(async () => {
    mockReplacementRepository = {
      getReplacementWithDate: jest.fn(),
    };

    mockGroupService = {
      getGroupWithId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReplacementData,
        {
          provide: GET_REPLACEMENTS_WITH_DATE,
          useValue: mockReplacementRepository,
        },
        { provide: GET_GROUP_WITH_DATA, useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<ReplacementData>(ReplacementData);
  });

  describe('getReplacementsWithDate', () => {
    it('should return replacements', async () => {});
  });
});
