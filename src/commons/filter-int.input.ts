import { Injectable } from '@nestjs/common';
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { ComparisonOperatorNumber } from './enums/comparison-operator-number.enum';

@Injectable()
@InputType()
export class FilterIntInput {
  @Field(() => Int, { description: 'Example field: 1' })
  @IsInt()
  value: number;

  @Field(() => ComparisonOperatorNumber, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
