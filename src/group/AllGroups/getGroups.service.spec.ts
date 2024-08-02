import { Test, TestingModule } from '@nestjs/testing';
import { GetGroups } from './getGroups.service';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';

describe('GetGroups', () => {
  let service: GetGroups;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      getAllGroups: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetGroups,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<GetGroups>(GetGroups);
  });

  describe('getAllGroups', () => {
    it('should get all groups from database', async () => {
      const mockGroup: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: 'mock group',
        },
      ];
      const mockAllGroups: InfoAllGroupDto = {
        groups: mockGroup,
      };
      mockGroupRepository.getAllGroups = jest.fn().mockResolvedValue(mockGroup);

      const result = await service.getAllGroups();
      expect(result).toEqual(mockAllGroups);
    });
  });
});
