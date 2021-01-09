import { InputType, Field, ID, HideField } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Matches } from 'class-validator';

@InputType()
export class UpdatePermissionsGrantedInput {
  @Field(() => ID)
  @Matches(/^[\w]+$/)
  _key: string;

  @Field(() => ID, { nullable: true })
  @Matches(/^Users\/[\w]+$/)
  @IsOptional()
  _from?: string;

  @Field(() => ID, { nullable: true })
  @Matches(/^Roles\/[\w]+$/)
  @IsOptional()
  _to?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @HideField()
  updatedBy = '';

  @HideField()
  updatedAt = new Date().toISOString();
}
