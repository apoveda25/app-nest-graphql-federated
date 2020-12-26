import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsArray, IsString } from 'class-validator';
import { FilterKeyInput } from '../../commons/filter-key.input';
import { FilterStringInput } from '../../commons/filter-string.input';
import { FilterDatetimeInput } from '../../commons/filter-datetime.input';
import { OperatorBoolean } from '../../commons/enums/operator-boolean.enum';

@InputType()
export class FilterUserInput {
  @Field(() => [FilterKeyInput], {
    description: 'Example field: 1234567',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "name@domain.com", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  email?: FilterStringInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "username", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  username?: FilterStringInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "name", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  name?: FilterStringInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "surname", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  surname?: FilterStringInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "Users/1234567", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  createdBy?: FilterStringInput[];

  @Field(() => [FilterStringInput], {
    description: 'Example field: [{value: "Users/1234567", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  updatedBy?: FilterStringInput[];

  @Field(() => [FilterDatetimeInput], {
    description: 'Example field: [{value: "Users/1234567", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  createdAt?: FilterDatetimeInput[];

  @Field(() => [FilterDatetimeInput], {
    description:
      'Example field: [{value: "2012-12-12T12:12:12.123Z", operator: EQUAL}]',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  updatedAt?: FilterDatetimeInput[];

  @Field(() => OperatorBoolean, {
    description: 'Example field: ASC',
    nullable: true,
  })
  @IsString()
  separator: OperatorBoolean;
}
