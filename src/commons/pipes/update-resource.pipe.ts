import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class UpdateResourcePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context) {}

  transform(value: any) {
    return value.map((el) => ({ ...el, updatedBy: this.context.user._id }));
  }
}
