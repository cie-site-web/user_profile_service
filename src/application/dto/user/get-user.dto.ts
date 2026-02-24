// application/dto/get-user.dto.ts

import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class GetUserDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}
