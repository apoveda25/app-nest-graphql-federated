import {
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export class CreateUserHash {
  @Matches(/^[\w]+$/)
  @IsOptional()
  _key?: string;

  @IsEmail()
  @IsString()
  email: string;

  @Matches(/^[\w]+$/)
  @IsString()
  username: string;

  @Transform((value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)))
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsDateString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
