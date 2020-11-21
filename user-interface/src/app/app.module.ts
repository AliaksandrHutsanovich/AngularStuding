import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {
  SectionComponent,
  ListOfCoursesComponent,
  CourseComponent,
  CoursePageComponent,
  CoursesPageComponent,
  NoDataComponent,
  ConfirmDialogComponent,
  AddCourseComponent,
  Page404Component,
  CoursesPageWrapperComponent,
  LoadingBlockComponent,
  AuthorsComponent,
  ValidationMessagesComponent,
  ChipComponent,
  InputDurationComponent,
  InputDateComponent,
} from './components';
import {
  BorderDirective,
  ValidateValueDirective,
} from './directives';
import {
  CoursesEffects,
  CourseEffects,
  EditCourseEffects,
} from './effects';
import {
  ResponseInterceptorInterceptor,
  TokenInterceptorInterceptor,
} from './interceptors';
import {
  CustomMaterialModule,
  LoginModule,
} from './modules';
import {
  DatePipe,
  OrderByPipe,
  SearchPipe,
  TransformTimePipe,
} from './pipes';
import {
  LoadService,
  CoursesService,
  AuthorsService,
} from './services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const pageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    children: [
      {
        path: '',
        component: CoursesPageWrapperComponent,
        canActivate: [AuthGuard],
      }, {
        path: 'new',
        component: AddCourseComponent,
        canActivate: [AuthGuard],
      }, {
        path: ':id',
        component: AddCourseComponent,
        canActivate: [AuthGuard],
      },
    ],
  }, {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    ListOfCoursesComponent,
    CourseComponent,
    CoursePageComponent,
    CoursesPageComponent,
    BorderDirective,
    NoDataComponent,
    TransformTimePipe,
    OrderByPipe,
    DatePipe,
    ConfirmDialogComponent,
    AddCourseComponent,
    Page404Component,
    CoursesPageWrapperComponent,
    LoadingBlockComponent,
    AuthorsComponent,
    ChipComponent,
    InputDurationComponent,
    InputDateComponent,
    ValidateValueDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(pageRoutes),
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    LoginModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      ...fromState.reducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forRoot([CoursesEffects, CourseEffects, EditCourseEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  providers: [
    SearchPipe,
    CoursesService,
    AuthGuard,
    LoadService,
    AuthorsService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ResponseInterceptorInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
