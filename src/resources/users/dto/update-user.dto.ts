import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { IsSocialSitesConstraint } from './validation/sociasites.decorator';

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

  @Validate(IsSocialSitesConstraint)
  @IsNotEmpty()
  socialSites: string;
}
