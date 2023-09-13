import { IsEmail, IsString, IsOptional } from 'class-validator';
import { IsEmailUnique } from '../custom-validators/isEmailUnique';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsEmailUnique()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
