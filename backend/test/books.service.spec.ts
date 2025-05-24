import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../src/books/books.service';
import { PrismaService } from '../src/prisma.service';

describe('BooksService', () => {
let service: BooksService;
let prisma: PrismaService;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    providers: [
        BooksService,
        { provide: PrismaService, useValue: { book: { findMany: jest.fn() } } },
    ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
});

it('should return paginated list', async () => {
    jest.spyOn(prisma.book, 'findMany').mockResolvedValue([]);
    expect(await service.findAll(1, 10)).toEqual([]);
});
});