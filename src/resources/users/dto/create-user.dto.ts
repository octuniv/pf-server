import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';

export class createUserDto extends PartialType(
  OmitType(UpdateUserDto, ['socialSites'] as const),
) {}
