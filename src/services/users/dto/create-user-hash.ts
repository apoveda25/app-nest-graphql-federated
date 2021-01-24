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
import { CREATED_REGEX } from '../../../commons/commons.constants';
import {
  CODE_SIX_DIGITS_REGEX,
  WORD_REGEX,
} from '../../../commons/commons.constants';

export class CreateUserHash {
  @Matches(/^[\w]+$/)
  @IsOptional()
  _key?: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsBoolean()
  emailActive: boolean;

  @Matches(CODE_SIX_DIGITS_REGEX)
  emailCode: string;

  @Matches(WORD_REGEX)
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

  @IsBoolean()
  deleted: boolean;

  @IsString()
  @Matches(CREATED_REGEX)
  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsString()
  deletedBy: string;

  @IsDateString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsString()
  deletedAt: string;
}
