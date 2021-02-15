import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../entities';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  id: number;
  @Input() course: Course;
  constructor(private router: Router) { }

  @Output() onClicked = new EventEmitter<number>();
  handleClick(courseId: number) {
    this.onClicked.emit(courseId);
  }

  goToCoursePage(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  ngOnInit(): void {
    console.log(this.course.id);
    this.id = this.course.id;
  }

  handleEditCourse(): void {
    this.router.navigate(['courses', this.id]);
  }

}
