import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadService {
  private show: boolean = false;
  private subjectToShow: Subject<boolean> = new Subject<boolean>();
  constructor() {
    this.subjectToShow.next(this.show);
  }

  updateShow(show: boolean) {
    this.show = show;
    this.subjectToShow.next(this.show);
  }

  getSubjectToShow() {
    return this.subjectToShow;
  }


}
