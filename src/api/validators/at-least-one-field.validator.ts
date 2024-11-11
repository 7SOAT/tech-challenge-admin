import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(object, args: ValidationArguments) {
    return Object.values(args.object).some(val => val !== undefined && val !== null && val !== '')
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'At least one argument is required'
  }
}

export function AtLeastOneField(validationOptions?: ValidationOptions) {
  return function (object: Function) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object,
      options: validationOptions,
      constraints: [],
      validator: AtLeastOneFieldConstraint,
      propertyName: ''
    });
  };
}