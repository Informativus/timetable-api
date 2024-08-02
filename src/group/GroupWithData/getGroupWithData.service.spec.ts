import { Test, TestingModule } from '@nestjs/testing';
import { IGroupRepository } from '../repository/groupRepository.interface';
import { GetGroupWithData } from './getGroupWithData.service';
import { GetGroupDto } from 'src/dto/group/getGroup.dto';
import { GroupDto } from 'src/dto/group/group.dto';

describe('GetGroupWithData', () => {
  let service: GetGroupWithData;
  let mockGroupRepository: Partial<IGroupRepository>;

  beforeEach(async () => {
    mockGroupRepository = {
      getGroupWithId: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetGroupWithData,
        { provide: 'IGroupRepository', useValue: mockGroupRepository },
      ],
    }).compile();

    service = module.get<GetGroupWithData>(GetGroupWithData);
  });

  describe('getGroupWithId', () => {
    it('should be get group info from database', async () => {
      const mockGroups: GetGroupDto[] = [
        {
          group_id: 1,
          id: '1I-1-23',
          title: 'mock group',
        },
      ];

      mockGroupRepository.getGroupWithId = jest
        .fn()
        .mockResolvedValue(mockGroups);

      const mockGroup: GroupDto = {
        id: '1I-1-23',
      };
      const result: GetGroupDto = await service.getGroupWithId(mockGroup);
      expect(result).toEqual(mockGroups[0]);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledTimes(1);
      expect(mockGroupRepository.getGroupWithId).toHaveBeenCalledWith(
        mockGroup,
      );
    });
  });
});
