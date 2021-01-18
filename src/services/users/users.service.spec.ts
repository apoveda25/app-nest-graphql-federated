import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserHash } from './dto/create-user-hash';
import { QueryParser } from '../../database/query-parser';
import { FilterUserInput } from './dto/filter-user.input';
import { OperatorBoolean } from '../../commons/enums/operator-boolean.enum';
import { SortUserInput } from './dto/sort-user.input';
import { OperatorSort } from '../../commons/enums/operator-sort.enum';
import { PaginationInput } from '../../commons/pagination.input';

describe('UsersService', () => {
  let usersService: UsersService;
  let spyUsersRepository: any;
  let spyQueryParser: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => ({}),
        },
        {
          provide: QueryParser,
          useFactory: () => ({
            filtersToAql: jest.fn(),
            sortToAql: jest.fn(),
            paginationToAql: jest.fn(),
          }),
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    spyUsersRepository = module.get<UsersRepository>(UsersRepository);
    spyQueryParser = module.get<QueryParser>(QueryParser);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(spyUsersRepository).toBeDefined();
    expect(spyQueryParser).toBeDefined();
  });

  describe('create', () => {
    it('should create an array of users', async () => {
      /**
       * Arrange
       */
      const documents: CreateUserHash[] = [
        {
          _key: 'prueba',
          username: '',
          name: '',
          surname: '',
          password: '',
          email: '',
          emailActive: true,
          emailCode: '',
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: '',
          updatedBy: '',
        },
      ];
      const map = jest.fn();
      const commit = jest.fn();
      const step = jest.fn(() => saveAll());
      spyUsersRepository.beginTransaction = jest.fn(() => ({ step, commit }));

      const saveAll = jest.fn(() => ({ map }));
      spyUsersRepository.getCollection = jest.fn(() => ({ saveAll }));
      const paramsBeginTransaction = {
        write: [spyUsersRepository.getCollection()],
      };

      /**
       * Act
       */
      await usersService.create(documents);

      /**
       * Assert
       */
      expect(spyUsersRepository.getCollection).toHaveBeenCalled();
      expect(spyUsersRepository.beginTransaction).toHaveBeenCalledWith(
        paramsBeginTransaction,
      );
      expect(step).toHaveBeenCalled();
      expect(saveAll).toHaveBeenCalled();
      expect(commit).toHaveBeenCalled();
      expect(map).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should get an array of users', async () => {
      /**
       * Arrange
       */
      const filters: FilterUserInput = {
        _key: [{ value: 'prueba', operator: 'EQUAL' }],
        separator: OperatorBoolean.AND,
      };
      const sort: SortUserInput = {
        _key: true,
        sort: OperatorSort.ASC,
      };
      const pagination: PaginationInput = { offset: 0, count: 10 };

      const map = jest.fn();
      spyUsersRepository.query = jest.fn(() => ({ map }));
      spyUsersRepository.getCollection = jest.fn(() => ({}));

      /**
       * Act
       */
      await usersService.findAll({ filters, sort });

      /**
       * Assert
       */
      expect(spyUsersRepository.query).toHaveBeenCalled();
      expect(spyUsersRepository.getCollection).toHaveBeenCalled();
      expect(spyQueryParser.filtersToAql).toHaveBeenCalledWith(filters);
      expect(spyQueryParser.sortToAql).toHaveBeenCalledWith(sort);
      expect(spyQueryParser.paginationToAql).toHaveBeenCalledWith(pagination);
      expect(map).toHaveBeenCalled();
    });
  });
});
