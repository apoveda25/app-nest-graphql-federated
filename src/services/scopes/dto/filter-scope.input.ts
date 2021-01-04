import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { OperatorBoolean } from '../../../commons/enums/operator-boolean.enum';
import { FilterKeyInput } from '../../../commons/filter-key.input';
import { FilterStringInput } from '../../../commons/filter-string.input';
import { FilterBooleanInput } from '../../../commons/filter-boolean.input';
import { FilterDatetimeInput } from '../../../commons/filter-datetime.input';

@InputType()
export class FilterScopeInput {
  @Field(() => [FilterKeyInput], { nullable: true })
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], { nullable: true })
  @IsArray()
  @IsOptional()
  description?: FilterStringInput[];

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
