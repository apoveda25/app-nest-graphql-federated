import { CreateRoleInput } from './create-role.input';
import { InputType, Field, ID, PartialType, HideField } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => ID)
  _key: string;

  @Field(() => String, { nullable: true })
  @Matches(/^[\w]+([\s][\w]+)*$/)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @HideField()
  @Matches(/^Roles\/[\w]+$/)
  @IsString()
  updatedBy: string;

  @HideField()
  updatedAt = new Date().toISOString();
}
