import { IsString, IsOptional, Length, IsInt, Min, Max } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    @Length(1, 255)
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    publishedYear?: number;
}