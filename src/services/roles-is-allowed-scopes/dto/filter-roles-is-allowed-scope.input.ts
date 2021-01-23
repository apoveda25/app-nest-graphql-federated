import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { FilterKeyInput } from '../../../commons/filter-key.input';
import { FilterStringInput } from '../../../commons/filter-string.input';
import { FilterDatetimeInput } from '../../../commons/filter-datetime.input';
import { OperatorBoolean } from '../../../commons/enums/operator-boolean.enum';

@InputType()
export class FilterRolesIsAllowedScopeInput {
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
