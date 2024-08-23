import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { IsSocialSites } from './validation/sociasites.validation';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/01[0-9]{1}-[0-9]{3,4}-[0-9]{3,4}/)
  @IsNotEmpty()
  phone: string;

  @Validate(IsSocialSites)
  @IsNotEmpty()
  socialSites: string;
}
