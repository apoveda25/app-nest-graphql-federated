import { InputType, ID, Field, HideField } from '@nestjs/graphql';
import { IsString, IsEmail, Matches, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { description: 'Example field: 1234567', nullable: true })
  @Matches(/^[\w]+$/)
  @IsOptional()
  _key?: string;

  @Field(() => String, { description: 'Example field: name@domain.com' })
  @IsEmail()
  @IsString()
  email: string;

  @Field(() => String, { description: 'Example field: username' })
  @Matches(/^[\w]+$/)
  @IsString()
  username: string;

  @Field(() => String, { description: 'Example field: ygjgkj12g3kuh2k1h' })
  @Matches(/^[\w.!@#$%^&*_+='",:;|<>]{8,20}$/)
  @IsString()
  password: string;

  @HideField()
  name = '';

  @HideField()
  surname = '';

  @HideField()
  createdBy = '';

  @HideField()
  updatedBy = '';

  @HideField()
  createdAt = new Date().toISOString();

  @HideField()
  updatedAt = '';
}
