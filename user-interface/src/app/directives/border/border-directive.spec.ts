import { Component } from '@angular/core';
import { BorderDirective } from './border-directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'about',
  template: `<div bordered [date]="date">component</div>`,
})
class AboutComponent {
  date: Date;
}

describe('BorderDirective', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AboutComponent, BorderDirective ],
    })
    .createComponent(AboutComponent);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new BorderDirective();
    expect(directive).toBeTruthy();
  });

  it('border should be green', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('div');
    component.date = new Date('4-20-2020');
    fixture.detectChanges();
    const borderColor = element.style.border;
    expect(borderColor).toEqual('1px solid green');
  });

  it('border should be blue', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('div');
    component.date = new Date('4-29-2020');
    fixture.detectChanges();
    const borderColor = element.style.border;
    expect(borderColor).toEqual('1px solid blue');
  });
});
