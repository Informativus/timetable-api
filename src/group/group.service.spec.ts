import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { IGroupRepository } from './repository/groupRepository.interface';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { InfoAllGroupDto } from '../dto/group/infoAllGroup.dto';

describe('GroupService', () => {
  let service: GroupService;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      getAllGroups: jest.fn(),
      getGroupWithId: jest.fn(),
      setGroup: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
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
