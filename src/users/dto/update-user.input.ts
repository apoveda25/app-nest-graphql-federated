import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, { description: 'Example field: 1234567' })
  @Matches(/^[\w]+$/)
  @IsString()
  _key: string;

  @Field(() => String, {
    description: 'Example field: name@domain.com',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, {
    description: 'Example field: username',
    nullable: true,
  })
  @Matches(/^[\w]+$/)
  @IsString()
  @IsOptional()
  username?: string;

  @Field(() => String, { description: 'Example field: name', nullable: true })
  @Matches(/^[\w]+(\s[\w]+)*$/)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, {
    description: 'Example field: surname',
    nullable: true,
  })
  @Matches(/^[\w]+(\s[\w]+)*$/)
  @IsString()
  @IsOptional()
  surname?: string;

  @HideField()
  @IsString()
  updatedBy: string;
}
