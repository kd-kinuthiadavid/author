import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string) {
    const user = await this.usersService.findByEmail(email);
    return !user; // Returns true if the email is unique, false otherwise
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEmailUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueConstraint,
      async: true,
    });
  };
}
