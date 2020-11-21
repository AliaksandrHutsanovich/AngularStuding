import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {  HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { InputDurationComponent } from './input-duration.component';
import { TransformTimePipe } from 'src/app/pipes/transform-time';

describe('InputDurationComponent', () => {
  let component: InputDurationComponent;
  let fixture: ComponentFixture<InputDurationComponent>;
  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
  let httpSpy;

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        InputDurationComponent,
        TransformTimePipe,
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          },
        })
      ],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
