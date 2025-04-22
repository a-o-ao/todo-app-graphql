import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from '../../src/todo/todo.resolver';
import { TodoService } from '../../src/todo/todo.service';

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  const mockTodoService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoResolver,
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
