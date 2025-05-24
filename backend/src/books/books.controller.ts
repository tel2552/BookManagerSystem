import { Controller, Get, Post, Put, Delete, Query, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
constructor(private readonly booksService: BooksService) {}

@Get()
findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10, // Consider using new ParseIntPipe({ optional: true }) if these are optional
) {
    return this.booksService.findAll(page, limit);
}

// Add this method to handle fetching a single book by ID
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.findOne(id);
    if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
}

@Post()
create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
}

@Put(':id')
update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
) {
    return this.booksService.update(id, dto);
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
}
}