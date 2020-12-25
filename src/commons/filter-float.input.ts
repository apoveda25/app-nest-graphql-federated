import { Injectable } from '@nestjs/common';
import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { ComparisonOperatorNumber } from './enums/comparison-operator-number.enum';

@Injectable()
@InputType()
export class FilterFloatInput {
  @Field(() => Float, { description: 'Example field: 1.1' })
  @IsNumber()
  value: number;

  @Field(() => ComparisonOperatorNumber, {
    description: 'Example field: EQUAL',
  })
  @IsString()
  operator: string;
}
