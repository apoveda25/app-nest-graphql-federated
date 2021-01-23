import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class CreateResourcePipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context) {}

  transform(value: any) {
    return value.map((el) => ({ ...el, createdBy: this.context.user._id }));
  }
}
