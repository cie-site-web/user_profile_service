import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, Max, Matches, IsDate } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class ListProfileDto {

    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;

    @IsNanoId()
    @IsOptional()
    userId?: string;

    @IsOptional()
    @IsString()
    lastName!: string;

    @IsOptional()
    @IsString()
    firstName!: string;

    @IsOptional()
    @IsString()
    address!: string;

    @IsOptional()
    @IsDate()
    birth!: Date;
}
