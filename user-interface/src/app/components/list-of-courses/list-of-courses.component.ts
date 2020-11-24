import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Course } from '../../entities';
import { CoursesService, LoadService } from '../../services';
import { ConfirmDialogComponent } from '../confirm-dialog';
import { Subject } from 'rxjs';
import { makeCoursesRequest } from 'src/app/actions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-list-of-courses',
  templateUrl: './list-of-courses.component.html',
  styleUrls: ['./list-of-courses.component.css']
})
export class ListOfCoursesComponent implements OnInit,
   DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy, OnChanges {
  courses: Course[];
  searchedCourses: Course[] = [];
  start: number;
  private subjectForCourses: Subject<Course[]>;

  selectedCourseId: number;
  prevSearchValue: string;

  @Input() searchValue: string;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private loadService: LoadService,
    private store: Store<State>,
  ) {
    this.courses = [];
    this.searchedCourses = this.courses;
    this.start = 0;
  }

  handleLoadMore() {
    this.loadService.updateShow(true);

    this.start += 3;
    this.store.dispatch(makeCoursesRequest({
      index: this.start,
      quantity: 3,
      searchValue: this.searchValue,
    }));
  }

  getCourses = ({ courses }) => {
    this.courses = courses;
    this.searchedCourses = courses;
    this.loadService.updateShow(false);
  }

  onClicked(courseId: number) {
    this.selectedCourseId = courseId;
    console.log('id=', courseId);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: '400px', data: courseId });
    dialogRef.afterClosed().subscribe(
      () => {
        this.loadService.updateShow(true);
        this.store.dispatch(makeCoursesRequest({
          index: 0,
          quantity: this.start + 3,
          searchValue: this.searchValue,
        }));
      },
    );
  }

  handleAddCourse(): void {
    this.router.navigate(['courses', 'new']);
  }

  ngOnInit(): void {
    this.loadService.updateShow(true);
    // this.subjectForCourses = this.coursesService.getSubjectForCourses();
    // this.subjectForCourses.subscribe(this.getCourses);
    this.store.pipe(select('coursesList'))
      .subscribe(this.getCourses);

  }

  ngOnChanges(): void {
    this.loadService.updateShow(true);
    if (this.prevSearchValue !== this.searchValue) {
      this.start = 0;
    }
    this.prevSearchValue = this.searchValue;
    this.store.dispatch(makeCoursesRequest({
      index: this.start,
      quantity: 3,
      searchValue: this.searchValue,
    }));
  }

  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngAfterContentInit(): void {
    console.log('afterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('afterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('afterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
  }

}
