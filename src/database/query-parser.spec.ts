import { Test, TestingModule } from '@nestjs/testing';
import { QueryParser } from './query-parser';

describe('QueryParser', () => {
  let provider: QueryParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryParser],
    }).compile();

    provider = module.get<QueryParser>(QueryParser);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
