import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Book } from '@prisma/client'; // Import Model from Book prisma

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10): Promise<{ books: Book[], totalItems: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const books = await this.prisma.book.findMany({
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' },
    });

    const totalItems = await this.prisma.book.count();

    return {
      books,
      totalItems,
    };
  }

  async findOne(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    return book;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({ data: dto });
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const bookExists = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!bookExists) {
      throw new NotFoundException(`Book with ID ${id} not found, cannot update.`);
    }
    return this.prisma.book.update({
      where: { id: Number(id) },
      data: dto,
    });
  }

  async remove(id: number): Promise<Book> {
    const bookExists = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!bookExists) {
      throw new NotFoundException(`Book with ID ${id} not found, cannot delete.`);
    }
    return this.prisma.book.delete({
      where: { id: Number(id) },
    });
  }
}