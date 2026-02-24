import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNanoId(length = 21, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNanoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [length],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [length] = args.constraints;

          if (typeof value !== 'string') return false;

          const regex = new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
          return regex.test(value);
        },
      },
    });
  };
}
