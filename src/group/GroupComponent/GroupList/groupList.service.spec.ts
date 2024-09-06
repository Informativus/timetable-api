import { Test, TestingModule } from '@nestjs/testing';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { InfoAllGroupDto } from 'src/dto/group/infoAllGroup.dto';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GroupList } from './groupList.service';

describe('GetGroups', () => {
  let service: GroupList;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      getAllGroups: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupList,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<GroupList>(GroupList);
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
