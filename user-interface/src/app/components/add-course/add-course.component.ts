import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { CoursesService, LoadService } from '../../services';
import { Course } from '../../entities';
import { Subject } from 'rxjs';
import { makeCourseRequest, editCourseRequest } from 'src/app/actions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  id: number;
  courseTitleTag: string;
  course: Course;
  private subjectForCourse: Subject<Course>;
  private subjectToRedirect: Subject<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private loadService: LoadService,
    private store: Store<State>,
    private translateService: TranslateService,
  ) {
    this.course = new Course(null, null, null, null, null, false, []);
    this.activatedRoute.params.subscribe(params => {
      if (Number(params['id'])) {
        this.id = Number(params['id']);
      }
    });
  }

  ngOnInit(): void {
    this.subjectToRedirect = this.coursesService.getSubjectToRedirect();
    this.subjectToRedirect.subscribe(
      () => {
        this.handleCancel();
        this.loadService.updateShow(false);
      },
    );

    if (this.id) {

      this.loadService.updateShow(true);
      this.subjectForCourse = this.coursesService.getSubjectForCourse();
      this.subjectForCourse.subscribe(
        (course) => {
          this.course = course;
          this.courseTitleTag = this.course.title;
          this.loadService.updateShow(false);
        },
      );
      this.store.dispatch(makeCourseRequest({ id: this.id }));

    }
  }

  handleCancel(): void {
    this.router.navigate(['courses']);
  }

  handleSubmit(): void {
    this.loadService.updateShow(true);
    this.store.dispatch(editCourseRequest({
      id: this.id,
      course: this.course,
    }));
  }

  validate() {
    return `
      ${this.translateService.instant('PAGES.ADD_COURSE.VALIDATION_MESSAGES.REQIURED')}
    `;
  }

  translateMessages(messages: string[]) {
    if (messages)
    return messages.map(message => this.translateService.instant(message));
  }

}
