import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CoursesPageWrapperComponent } from './courses-page-wrapper.component';

describe('CoursesPageWrapperComponent', () => {
  let component: CoursesPageWrapperComponent;
  let fixture: ComponentFixture<CoursesPageWrapperComponent>;

  @Component({
    selector: 'app-header',
    template: '<div class="header">Header</div>',
  })
  class HeaderComponent {}

  @Component({
    selector: 'app-breadcrumbs',
    template: '<div class="breadcrumbs">Breadcrumbs</div>',
  })
  class BreadcrumbsComponent {};

  @Component({
    selector: 'app-section',
    template: `<section>
                <input type="search" #searchInput (input)="handleChange($event.target.value)" />
              </section>`,
  })
  class SectionComponent {
    @ViewChild('searchInput') 
    input: ElementRef;
    @Output() onSearched = new EventEmitter<string>();

    handleChange(value: string) {
      this.onSearched.emit(value);
    }
  }

  @Component({
    selector: 'app-list-of-courses',
    template: '<div>List of courses</div>',
  })
  class ListOfCoursesComponent {
    @Input() searchValue: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageWrapperComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        SectionComponent,
        ListOfCoursesComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClicked should be called', () => {
    const componentDe = fixture.debugElement.query(By.css('input'));
    componentDe.nativeElement.value = 'course title';
    componentDe.triggerEventHandler('input', { target: componentDe.nativeElement });
    fixture.detectChanges();
    expect(component.searchCourseTitle).toEqual('course title');
  });
});
