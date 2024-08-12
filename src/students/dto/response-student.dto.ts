import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsInt, IsString } from 'class-validator';

@Exclude()
export class ResponseStudentDto {
  @Expose()
  @IsInt()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;
}
