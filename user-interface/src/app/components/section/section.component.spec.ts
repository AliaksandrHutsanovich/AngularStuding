import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { SectionComponent } from './section.component';
import { By } from '@angular/platform-browser';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    const spy = jasmine.createSpy('spy');
    component.onSearched.emit = spy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSerarched.emit should be called as a result of subscription when value', (done) => {
    const component = fixture.componentInstance;
    const componentEl = fixture.debugElement.query(By.css('input')).nativeElement;
    component.form.get('search').setValue('value');
    componentEl.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.onSearched.emit).toHaveBeenCalledWith('value');
      done();
    }, 600);
  });

  it('onSerarched.emit should be called as a result of subscription when no value', (done) => {
    const component = fixture.componentInstance;
    const componentEl = fixture.debugElement.query(By.css('input')).nativeElement;
    component.form.get('search').setValue('');
    componentEl.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.onSearched.emit).toHaveBeenCalledWith('');
      done();
    }, 600);
  });
});
