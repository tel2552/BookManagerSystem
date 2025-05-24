import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsInt()
    @Min(1000) // สมมติว่าปีที่พิมพ์ต้องไม่ต่ำกว่า 1000
    @Max(new Date().getFullYear()) // สมมติว่าปีที่พิมพ์ต้องไม่เกินปีปัจจุบัน
    publishedYear: number;
}