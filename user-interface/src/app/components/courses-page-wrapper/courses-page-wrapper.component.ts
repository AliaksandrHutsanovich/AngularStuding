import {
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-courses-page-wrapper',
  templateUrl: './courses-page-wrapper.component.html',
  styleUrls: ['./courses-page-wrapper.component.css']
})
export class CoursesPageWrapperComponent implements OnInit {
  searchCourseTitle: string;
  constructor() { }

  onSearched(text: string) {
    this.searchCourseTitle = text;
  }

  ngOnInit(): void {
  }

}
