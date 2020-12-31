import { InputType, ID, Field, HideField } from '@nestjs/graphql';
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
  @Matches(/^[\w]+$/)
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
  @Matches(/^[\w]+$/)
  @IsString()
  username: string;

  @Field(() => String)
  @Matches(/^[\w.!@#$%^&*_+='",:;|<>]{8,20}$/)
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
  @Matches(/^Users\/[\w]+$/)
  @IsString()
  createdBy: string;

  @HideField()
  updatedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';
}
