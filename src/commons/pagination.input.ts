import { Injectable } from '@nestjs/common';
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

@Injectable()
@InputType()
export class PaginationInput {
  @Field(() => Int, { description: 'Example field: 100', nullable: true })
  @Min(0)
  @IsInt()
  @IsOptional()
  offset = 0;

  @Field(() => Int, { description: 'Example field: 10', nullable: true })
  @Max(1000)
  @Min(1)
  @IsInt()
  @IsOptional()
  count = 10;
}
