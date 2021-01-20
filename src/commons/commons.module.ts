import { Module } from '@nestjs/common';
import { PaginationInput } from './pagination.input';
import { FilterKeyInput } from './filter-key.input';
import { FilterStringInput } from './filter-string.input';
import { FilterBooleanInput } from './filter-boolean.input';
import { FilterIntInput } from './filter-int.input';
import { FilterFloatInput } from './filter-float.input';
import { FilterDatetimeInput } from './filter-datetime.input';
import { InputTransform } from './utils/input-transform';
import { InputsQueryPipe } from './pipes/inputs-query.pipe';

@Module({
  providers: [
    PaginationInput,
    FilterKeyInput,
    FilterStringInput,
    FilterBooleanInput,
    FilterIntInput,
    FilterFloatInput,
    FilterDatetimeInput,
    InputTransform,
    InputTransform,
    InputsQueryPipe,
  ],
  exports: [InputTransform, InputsQueryPipe],
})
export class CommonsModule {}
