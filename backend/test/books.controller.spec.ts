import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';
import { CreateBookDto, UpdateBookDto } from '../src/books/dto';

describe('BooksController', () => {
let controller: BooksController;
let service: BooksService;

const mockDate = new Date();
const mockBook = {
    id: 1,
    title: 'Mock Book',
    author: 'Author',
    publishedYear: 2023,
    createdAt: mockDate,
    updatedAt: mockDate,
};
const mockBooksList = [mockBook]; // สำหรับ findAll

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    controllers: [BooksController],
    providers: [
        { provide: BooksService, 
        useValue: {
            findAll: jest.fn().mockResolvedValue(mockBooksList),
            create: jest.fn().mockResolvedValue(mockBook),
            update: jest.fn().mockResolvedValue(mockBook),
            remove: jest.fn().mockResolvedValue({ ...mockBook, message: 'Book deleted successfully' }), //(สมมติว่า service คืน object ที่ถูกลบ หรือ object ที่มี message)
            }
        },
    ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
});

it('should return book list', async () => {
    const result = await controller.findAll(1, 10);
    expect(service.findAll).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual(mockBooksList);
});

it('should create a book', async () => {
    const createBookDto: CreateBookDto = { title: 'New Book', author: 'New Author', publishedYear: 2024 };
    const result = await controller.create(createBookDto);
    expect(service.create).toHaveBeenCalledWith(createBookDto);
    expect(result).toEqual(mockBook);
});

it('should update a book', async () => {
    const bookId = 1;
    const updateBookDto: UpdateBookDto = { title: 'Updated Book Title' };
    // สมมติว่า service.update คืน book ที่อัปเดตแล้ว และมีการเปลี่ยนแปลง updatedAt
    const updatedMockBook = { ...mockBook, ...updateBookDto, updatedAt: new Date() };
    (service.update as jest.Mock).mockResolvedValue(updatedMockBook);

    const result = await controller.update(bookId, updateBookDto);
    expect(service.update).toHaveBeenCalledWith(bookId, updateBookDto);
    expect(result).toEqual(updatedMockBook);
});

it('should remove a book', async () => {
    const bookId = 1;
    // ปรับ mock response ให้ตรงกับสิ่งที่ service.remove คืนค่าจริงๆ
    const mockDeleteResponse = { ...mockBook, message: 'Book deleted successfully' };
    (service.remove as jest.Mock).mockResolvedValue(mockDeleteResponse);

    const result = await controller.remove(bookId);
    expect(service.remove).toHaveBeenCalledWith(bookId);
    expect(result).toEqual(mockDeleteResponse);
    });
});