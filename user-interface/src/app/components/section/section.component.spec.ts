import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { By } from '@angular/platform-browser';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionComponent ]
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
    const debugComponent = fixture.debugElement.query(By.css('input'));
    const componentEl = debugComponent.nativeElement;
    componentEl.value = 'value';
    componentEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    componentEl.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.onSearched.emit).toHaveBeenCalledWith('value');
      done();
    }, 600);
  });

  it('onSerarched.emit should be called as a result of subscription when no value', (done) => {
    const debugComponent = fixture.debugElement.query(By.css('input'));
    const componentEl = debugComponent.nativeElement;
    componentEl.value = '';
    componentEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    componentEl.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.onSearched.emit).toHaveBeenCalledWith('');
      done();
    }, 600);
  });
});
