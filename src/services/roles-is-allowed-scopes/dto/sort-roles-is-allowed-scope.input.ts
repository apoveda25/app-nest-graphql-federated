import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { OperatorSort } from 'src/commons/enums/operator-sort.enum';

@InputType()
export class SortRolesIsAllowedScopeInput {
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
