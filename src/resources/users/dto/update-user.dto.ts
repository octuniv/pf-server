import {
  ArrayNotEmpty,
  IsArray,
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

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Validate(IsSocialSites)
  socialSites: string[];
}
