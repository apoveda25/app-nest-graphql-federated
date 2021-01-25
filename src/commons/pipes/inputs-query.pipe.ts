import { Injectable, PipeTransform } from '@nestjs/common';
import { InputTransform } from '../utils/input-transform';

@Injectable()
export class InputsQueryPipe implements PipeTransform {
  constructor(private readonly inputTransform: InputTransform) {}

  transform(value: any) {
    if (value?.separator) {
      value.deleted = [{ value: false, operator: '==' }];
      return this.inputTransform.filtersToArray(value);
    }

    if (value?.sort) return this.inputTransform.sortToArray(value);

    return value;
  }
}
