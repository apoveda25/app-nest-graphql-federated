import { Injectable } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ComparisonOperatorString } from './enums/comparison-operator-string.enum';

@Injectable()
@InputType()
export class FilterStringInput {
  @Field(() => String, { description: 'Example field: string' })
  @IsString()
  value: string;

  @Field(() => ComparisonOperatorString, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
