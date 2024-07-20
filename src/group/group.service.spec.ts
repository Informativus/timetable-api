import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupService],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  describe('getAllGroups', () => {
    it('should return all groups', async () => {
      jest.spyOn(service, 'getAllGroups');
      expect(await service.getAllGroups());
    });
  });
});
