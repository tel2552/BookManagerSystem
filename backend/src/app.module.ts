import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller'; // Import AppController

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}