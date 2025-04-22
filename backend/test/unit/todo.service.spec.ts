import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../../src/todo/todo.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockPrismaService = {
    todo: {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
