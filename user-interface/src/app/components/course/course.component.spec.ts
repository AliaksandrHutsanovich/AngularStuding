import {
  Component,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../entities';

import { CourseComponent } from './course.component';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, TransformTimePipe } from '../../pipes';

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {

  transform(value: string): string {
     return value;
  }

}

@Component({
  template: `
    <app-course
      [course]="course"
      (onClicked)="onClicked($event)">
    </app-course>`
})
class TestHostComponent {
  course: Course = {
    id: 2,
    title: 'new course 2',
    duration: '115',
    creationDate: '11-20-2019',
    description: 'Another one course',
    topRated: true,
    authors: [],
  };
  onClicked(courseId: number) {
    console.log('id=', courseId);
  }
}

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let componentDe: DebugElement;
  let componentEl: any;
  let expectedCourse: any;
  let entranceCourse: Course;

  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponentDe: DebugElement;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
        TestHostComponent,
        DatePipe,
        TransformTimePipe,
        TranslatePipe,
      ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    entranceCourse = {
      id: 1,
      title: 'new course',
      duration: '82',
      creationDate: '11-9-2019',
      description: 'This is my new course',
      topRated: true,
      authors: [],
    };
    expectedCourse = {
      id: 1,
      title: 'NEW COURSE',
      duration: '1h 22min',
      creationDate: '9 Nov 2019',
      description: 'This is my new course',
      topRated: true,
    };

    router = TestBed.get(Router);
    const spyObj = jasmine.createSpyObj('CourseComponent', ['handleClick', 'goToCoursePage']);
    component.course = entranceCourse;
    component.onClicked.emit = spyObj.handleClick;
    router.navigate = spyObj.goToCoursePage;

    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title', () => {
    componentDe = fixture.debugElement.query(By.css('.item__head-section > h3'));
    componentEl = componentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.title);
  });

  it('should display course duration', () => {
    componentDe = fixture.debugElement.query(By.css('.item__timestamp:first-child > p'));
    componentEl = componentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.duration);
  });

  it('should display course creation date', () => {
    componentDe = fixture.debugElement.query(By.css('.item__timestamp:nth-child(2) > p'));
    componentEl = componentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.creationDate);
  });

  it('should display course description', () => {
    componentDe = fixture.debugElement.query(By.css('.item__text'));
    componentEl = componentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.description);
  });

  it('handleEditCourse shold be called', () => {
    componentDe = fixture.debugElement.query(By.css('.item__actions > button:nth-child(1)'));
    componentEl = componentDe.nativeElement;
    componentEl.click();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('handleClick handler should be called', () => {
    componentDe = fixture.debugElement.query(By.css('.item__actions > button:nth-child(2)'));
    componentEl = componentDe.nativeElement;
    componentEl.click();

    expect(component.onClicked.emit).toHaveBeenCalled();
  });

  it('goToCoursePage handler should be called', () => {
    componentDe = fixture.debugElement.query(By.css('.item__head-section > h3'));
    componentEl = componentDe.nativeElement;
    componentEl.click();

    expect(router.navigate).toHaveBeenCalled();
  });

  it ('should create host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should display course title on host', () => {
    hostComponentDe = fixture.debugElement.query(By.css('.item__head-section > h3'));
    componentEl = hostComponentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.title);
  });

  it('should display course duration on host', () => {
    hostComponentDe = fixture.debugElement.query(By.css('.item__timestamp:first-child > p'));
    componentEl = hostComponentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.duration);
  });

  it('should display course creation date on host', () => {
    hostComponentDe = fixture.debugElement.query(By.css('.item__timestamp:nth-child(2) > p'));
    componentEl = hostComponentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.creationDate);
  });

  it('should display course description on host', () => {
    hostComponentDe = fixture.debugElement.query(By.css('.item__text'));
    componentEl = hostComponentDe.nativeElement;
    expect(componentEl.textContent).toContain(expectedCourse.description);
  });
});
