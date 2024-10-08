/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isSocialSites', async: false })
export class IsSocialSites implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return this.isValid(value);
  }

  private isValid(value: any): boolean {
    const urlExpression =
      /^http(s)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return (
      Array.isArray(value) &&
      value.reduce((acc, cur) => acc && urlExpression.test(cur))
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each elements in socialSites must be valid format!';
  }
}
