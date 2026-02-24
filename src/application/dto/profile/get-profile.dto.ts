// application/dto/get-activity.dto.ts

import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/commons/deccorators.commons';

export class GetProfileDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}
