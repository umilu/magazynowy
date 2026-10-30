import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/configure-app';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Products (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();

    const prisma = app.get(PrismaService);
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: [
        { name: 'Laptop', quantity: 10 },
        { name: 'Mysz', quantity: 25 },
      ],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({ name: 'Laptop', quantity: 10 }),
      expect.objectContaining({ name: 'Mysz', quantity: 25 }),
    ]);
  });

  it('creates a product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Monitor', quantity: 5 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Monitor',
        quantity: 5,
      }),
    );
  });
});
