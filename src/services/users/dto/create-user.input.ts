import { InputType, ID, Field, HideField } from '@nestjs/graphql';
import { CREATED_REGEX } from '../../../commons/commons.constants';
import {
  KEY_REGEX,
  WORD_REGEX,
  PASSWORD_REGEX,
} from '../../../commons/commons.constants';
import {
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

const emailCodeGenerate = (lenght: number) => {
  let code = '';

  for (let i = 0; i < lenght; i++) {
    code += `${Math.floor(Math.random() * 10)}`;
  }

  return code;
};

@InputType()
export class CreateUserInput {
  @Field(() => ID, { nullable: true })
  @Matches(KEY_REGEX)
  @IsOptional()
  _key?: string;

  @Field(() => String)
  @IsEmail()
  @IsString()
  email: string;

  @HideField()
  emailActive = false;

  @HideField()
  emailCode = emailCodeGenerate(6);

  @Field(() => String)
  @Matches(WORD_REGEX)
  @IsString()
  username: string;

  @Field(() => String)
  @Matches(PASSWORD_REGEX)
  @IsString()
  password: string;

  @HideField()
  name = '';

  @HideField()
  surname = '';

  @Field(() => Boolean)
  @IsBoolean()
  active: boolean;

  @HideField()
  deleted = false;

  @HideField()
  @Matches(CREATED_REGEX)
  @IsString()
  createdBy: string;

  @HideField()
  updatedBy = '';

  @HideField()
  deletedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';

  @HideField()
  deletedAt = '';
}
