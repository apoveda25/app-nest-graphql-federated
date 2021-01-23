import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { OperatorSort } from '../../../commons/enums/operator-sort.enum';

@InputType()
export class SortUsersActsAsRoleInput {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  _key?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  _from?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  _to?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  createdBy?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  updatedBy?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  createdAt?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  updatedAt?: boolean;

  @Field(() => OperatorSort)
  @IsString()
  sort: OperatorSort;
}
