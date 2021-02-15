import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { InputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputDateComponent,
        TranslatePipe,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleBlur should be called', () => {
    const component = fixture.componentInstance;
    component.touch = jasmine.createSpy();
    const componentEl = fixture.nativeElement.querySelector('input');
    componentEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.touch).toHaveBeenCalled();
  });
});
