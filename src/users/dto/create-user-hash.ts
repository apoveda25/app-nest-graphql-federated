import {
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { IsBoolean } from 'class-validator';

export class CreateUserHash {
  @Matches(/^[\w]+$/)
  @IsOptional()
  _key?: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsBoolean()
  emailActive: boolean;

  @Matches(/^[\d]{6}$/)
  emailCode: string;

  @Matches(/^[\w]+$/)
  @IsString()
  username: string;

  @Transform((value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)))
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsDateString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
