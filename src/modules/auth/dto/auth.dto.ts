import { Report, User } from '@prisma/client';
import {
  IsString,
  isNumber,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  user: User;
  accessToken: string;
}

export class RegisterAuthDTO {
  @ApiProperty({ type: String })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  middleName: string;

  @ApiProperty({ type: String })
  @IsString()
  admissionNumber: string;

  @ApiProperty({ enum: ['teacher', 'student', 'admin'] })
  @IsString()
  role: string;

  @ApiProperty({ type: [] })
  @IsArray()
  reports: Report[];

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  class: string;

  @ApiProperty({ type: String })
  @IsString()
  department: string;
}

export class LoginUserDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}
