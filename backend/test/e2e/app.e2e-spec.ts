import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test.local' })

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Todo GraphQL (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService); // ← ここで prisma に代入
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect(); // ← 明示的に prisma を使う
    await app.close();
  });

  const graphqlEndpoint = '/graphql';

  it('should create a todo', async () => {
    const createTodoMutation = `
      mutation {
        createTodo(createTodoInput: {
          title: "テストTODO",
          contents: "内容です"
        }) {
          id
          title
          contents
          status
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: createTodoMutation });

    createdId = response.body.data.createTodo.id;

    expect(response.body.data.createTodo).toMatchObject({
      title: 'テストTODO',
      contents: '内容です',
      status: 'PENDING',
    });
  });

  it('should return list of todos', async () => {
    const query = `
      query {
        todos {
          id
          title
          status
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query });

    console.log(JSON.stringify(response.body, null, 2));

    expect(response.body.data.todos.length).toBeGreaterThan(0);
  });

  it('should update a todo status', async () => {

    const updateMutation = `
      mutation {
        updateTodo(updateTodoInput: {
          id: ${createdId},
          title: "テストTODO updated",
          contents: "内容です updated",
          status: "COMPLETED"
        }) {
          id
          title
          contents
          status
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: updateMutation });

    expect(response.body.data.updateTodo).toMatchObject({
      title: 'テストTODO updated',
      contents: '内容です updated',
      status: 'COMPLETED',
    });
  });

  it('should delete a todo', async () => {
    const deleteMutation = `
      mutation {
        removeTodo(id: ${createdId}) {
          id
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: deleteMutation });

    expect(response.body.data.removeTodo.id).toBe(createdId);

    // 念のため、取得して存在しないことを確認
    const query = `
      query {
        todos {
          id
        }
      }
    `;

    const check = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query });

    const ids = check.body.data.todos.map((todo) => todo.id);
    expect(ids).not.toContain(createdId);
  });
});
