import { Test, TestingModule } from '@nestjs/testing';
import { PostgresDatabaseService } from './postgres-database.service';

describe('PostgresDatabaseService', () => {
  let service: PostgresDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresDatabaseService],
    }).compile();

    service = module.get<PostgresDatabaseService>(PostgresDatabaseService);
  });

  describe('sendData', () => {
    it('should send query to database', async () => {
      jest.spyOn(service, 'sendQuery');
      expect(
        await service.sendQuery({
          text: 'SELECT * FROM student_groups',
          values: [],
        }),
      );
    });
  });
});
