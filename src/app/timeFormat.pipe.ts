import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'timeFormat'})
export class timeFormat implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}

  transform(value) {
    if(value>60){
    return Math.round(value/60);
    }else{
      return 1;
    }
  }

}