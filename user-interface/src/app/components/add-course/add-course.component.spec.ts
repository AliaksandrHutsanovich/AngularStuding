import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AddCourseComponent } from './add-course.component';
import { TransformTimePipe } from '../../pipes/transform-time';
import { CoursesService } from '../../services/courses';
import { LoadService } from '../../services/load';
import { Course } from 'src/app/entities/course';
import { of } from 'rxjs';

describe('AddCourseComponent', () => {
  const course = new Course(
    4,
    'new course',
    '5-20-2020',
    '23',
    '',
    false,
    []
  );
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let route: ActivatedRoute;
  let httpSpy;
  let storeSpy;
  const subscribe = (fn) => {
    fn(course);
  };

  const spy = jasmine.createSpy();
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  routerSpy.navigate.and.callFake(() => {
    spy();
  });

  const withParam = {
    params: of({ id: 1 }),
  };

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.post.and.returnValue({ subscribe });
    httpSpy.put.and.returnValue({ subscribe });
    httpSpy.get.and.returnValue({ subscribe });

    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);

    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent, TransformTimePipe ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: withParam,
        },
        CoursesService,
        LoadService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create if id is provided', () => {
    expect(component).toBeTruthy();
  });

  it('handleSubmit should be called', () => {
    route.params = of({ id: 1 });
    fixture.detectChanges();
    const componentEl = fixture.nativeElement.querySelector('.form__submit');
    componentEl.click();

    expect(spy).toHaveBeenCalled();
  });

  it('handleCancel should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('.form__cancel');
    componentEl.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should create if id is not provided', () => {
    route.params = of({});
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('handleSubmit should be called if id is not provided', () => {
    route.params = of({});
    fixture.detectChanges();

    const componentEl = fixture.nativeElement.querySelector('.form__submit');
    componentEl.click();

    expect(spy).toHaveBeenCalled();
  });
});
