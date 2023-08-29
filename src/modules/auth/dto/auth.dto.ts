import { IsString, isNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthResponseDTO {
  user: '';
  accessToken: string;
}

export class RegisterAuthDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  middleName: string;

  @IsEmail()
  email: string;

  @IsString()
  class: string;

  @IsString()
  department: string;
}

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
