import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { StatusEnum } from 'src/domain/enums/status.enum';

export class ListUserDto {

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  status?: StatusEnum;

  @IsOptional()
  @IsString()
  email?: string;
}
