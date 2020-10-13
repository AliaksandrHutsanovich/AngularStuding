import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../../services/courses/courses.service';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let httpSpy;
  const subscribe = (fn) => {
    fn();
  };
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.delete.and.returnValue({ subscribe });

    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        { provide: HttpClient, useValue: httpSpy },
        CoursesService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleConform should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('#cofirm');
    componentEl.click();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('handleDismis should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('#close');
    componentEl.click();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
