import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
