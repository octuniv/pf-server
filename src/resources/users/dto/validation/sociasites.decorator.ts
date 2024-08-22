/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { config } from 'dotenv';

config({ path: '.env.variables' });

@ValidatorConstraint({ name: 'isNumberArray', async: false })
export class IsSocialSitesConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return this.isValid(value);
  }

  private isValid(socialSites: string): boolean {
    if (typeof socialSites !== 'string') return false;
    const sepLetter = process.env.SEP_LETTER;
    const urlExpression =
      /http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const sites = socialSites.split(sepLetter);
    if (!sites.every((site) => urlExpression.test(site))) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each elements in socialSites must be valid format!';
  }
}
