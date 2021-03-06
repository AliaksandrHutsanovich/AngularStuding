import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import { AddCourseComponent } from './add-course.component';
import { BreadcrumbsComponent } from '../breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { TransformTimePipe } from '../../pipes';
import { CoursesService, LoadService } from '../../services';
import { Course } from 'src/app/entities';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

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
  let translateSpy;
  let coursesServiceSpy;
  const subscribe = (fn) => {
    fn(course);
  };

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {

  transform(value: string): string {
     return value;
  }

}

  const spy = jasmine.createSpy();
  const spyToTranslate = jasmine.createSpy();
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
    translateSpy = jasmine.createSpyObj('TranslateService', [
      'instant'
    ]);
    coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'getSubjectToRedirect', 'getSubjectForCourse',
    ]);

    translateSpy.instant = (message) => {
      spyToTranslate();
      return message
    }

    coursesServiceSpy.getSubjectToRedirect.and.returnValue({ subscribe });
    coursesServiceSpy.getSubjectForCourse.and.returnValue({ subscribe });

    TestBed.configureTestingModule({
      declarations: [
        AddCourseComponent,
        TransformTimePipe,
        TranslatePipe,
        BreadcrumbsComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: withParam,
        },
        { provide: CoursesService, useValue: coursesServiceSpy },
        LoadService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: Store, useValue: storeSpy },
        { provide: TranslateService, useValue: translateSpy },
      ],
      imports: [
        FormsModule,
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

    expect(storeSpy.dispatch).toHaveBeenCalled();
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

    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('translate should be called', () => {
    component.validate();
    expect(spyToTranslate).toHaveBeenCalled();
  });

  it('translateMessages should not be called', () => {
    expect(component.translateMessages(null)).toBeUndefined();
  })

  it('translateMessages should be called', () => {
    expect(
      component.translateMessages(['message1', 'message2', ''])
    ).toEqual(['message1', 'message2', '']);
  });
});
