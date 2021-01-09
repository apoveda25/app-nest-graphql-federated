import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { FilterBooleanInput } from 'src/commons/filter-boolean.input';
import { FilterKeyInput } from '../../../commons/filter-key.input';
import { FilterStringInput } from '../../../commons/filter-string.input';
import { FilterDatetimeInput } from '../../../commons/filter-datetime.input';
import { OperatorBoolean } from 'src/commons/enums/operator-boolean.enum';

@InputType()
export class FilterAuthorizationByRoleInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _from?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _to?: FilterStringInput[];

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
