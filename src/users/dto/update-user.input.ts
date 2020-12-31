import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @Matches(/^[\w]+$/)
  @IsString()
  _key: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @Matches(/^[\w]+$/)
  @IsString()
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @Matches(/^[\w]+(\s[\w]+)*$/)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @Matches(/^[\w]+(\s[\w]+)*$/)
  @IsString()
  @IsOptional()
  surname?: string;

  @HideField()
  updatedBy = '';

  @HideField()
  updatedAt = new Date().toISOString();
}
