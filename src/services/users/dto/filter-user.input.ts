import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsArray, IsString } from 'class-validator';
import { FilterKeyInput } from '../../../commons/filter-key.input';
import { FilterStringInput } from '../../../commons/filter-string.input';
import { FilterDatetimeInput } from '../../../commons/filter-datetime.input';
import { OperatorBoolean } from '../../../commons/enums/operator-boolean.enum';
import { FilterBooleanInput } from '../../../commons/filter-boolean.input';

@InputType()
export class FilterUserInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  email?: FilterStringInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  @IsArray()
  @IsOptional()
  emailActive?: FilterBooleanInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  username?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  surname?: FilterStringInput[];

  @Field(() => [FilterBooleanInput], { nullable: true })
  @IsArray()
  @IsOptional()
  active?: FilterBooleanInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  createdBy?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  updatedBy?: FilterStringInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  createdAt?: FilterDatetimeInput[];

  @Field(() => [FilterDatetimeInput], { nullable: true })
  @IsArray()
  @IsOptional()
  updatedAt?: FilterDatetimeInput[];

  @Field(() => OperatorBoolean)
  @IsString()
  separator: OperatorBoolean;
}
