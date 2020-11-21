import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBlockComponent } from './loading-block.component';
import { LoadService } from '../../services/load';

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;
  let fixture: ComponentFixture<LoadingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBlockComponent],
      providers: [LoadService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.updateShow(true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
