import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'control',
  standalone: true
})
export class ControlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
