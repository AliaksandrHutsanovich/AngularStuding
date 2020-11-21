import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../entities/course';

import { ListOfCoursesComponent } from './list-of-courses.component';
import { SearchPipe } from '../../pipes/search';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { CoursesService } from '../../services/courses';
import { LoadService } from '../../services/load';

@Component({
  template: `
    <app-list-of-courses [searchValue]="value">
    </app-list-of-courses>`
})
class TestHostComponent {
  value: string;
}

describe('ListOfCoursesComponent', () => {
  let component: ListOfCoursesComponent;
  let fixture: ComponentFixture<ListOfCoursesComponent>;
  let componentEl: any;
  let httpSpy;
  let suscribeSpy;
  const course = new Course(
    4,
    'new course',
    '5-20-2020',
    '23',
    '',
    false,
    [],
  );
  const courses = [course];

  const spy = jasmine.createSpy();
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  routerSpy.navigate.and.callFake(() => {
    spy();
  });

  @Component({
    selector: 'app-course',
    template: '<div class="item" (click)="handleClick(course.id)">COURSE</div>',
  })
  class CourseComponent {
    @Input() course: Course;
    @Output() onClicked = new EventEmitter<number>();
    handleClick(courseId: number) {
      this.onClicked.emit(courseId);
    }
  }

  const mockDialog = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => ({
        subscribe: (fn) => { fn(); },
      }),
    }),
  };

  beforeEach(async(() => {
    suscribeSpy = jasmine.createSpy('spy').and.callFake(
      (fn) => {
        fn(courses);
      },
    );
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.post.and.returnValue({ subscribe: suscribeSpy });
    httpSpy.put.and.returnValue({ subscribe: suscribeSpy });
    httpSpy.get.and.returnValue({ subscribe: suscribeSpy });

    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        ListOfCoursesComponent,
        CourseComponent,
        OrderByPipe,
      ],
      providers: [
        SearchPipe,
        CoursesService,
        LoadService,
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        { provide: HttpClient, useValue: httpSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClicked should be called', () => {
    componentEl = fixture.nativeElement.querySelector('.item');
    componentEl.click();
    //the id of the first course in list
    expect(component.selectedCourseId).toEqual(course.id);
    expect(mockDialog.open).toHaveBeenCalled();
  });

  //for this case use test host component
  it('subscribe in ngOnChanges should be called', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;
    hostComponent.value = 'value';
    hostFixture.detectChanges();
    //three times because onChange and onInit called at the beginning and onChange after update
    expect(suscribeSpy).toHaveBeenCalledTimes(3);
  });

  it('handleAddCourse should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('.list-items-section__button');
    componentEl.click();

    expect(spy).toHaveBeenCalled();
  });

  it('handleLoadMore should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('.load-button');
    componentEl.click();
    //two times because onInit and handleLoadMore
    expect(suscribeSpy).toHaveBeenCalledTimes(2);
  });
});
