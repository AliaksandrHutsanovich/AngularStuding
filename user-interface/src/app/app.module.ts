import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section';
import { ListOfCoursesComponent } from './components/list-of-courses';
import { CourseComponent } from './components/course';
import { CoursePageComponent } from './components/course-page';
import { CoursesPageComponent } from './components/courses-page';
import { BorderDirective } from './directives/border';
import { NoDataComponent } from './components/no-data';
import { TransformTimePipe } from './pipes/transform-time';
import { OrderByPipe } from './pipes/order-by';
import { DatePipe } from './pipes/date';
import { SearchPipe } from './pipes/search';
import { CoursesService } from './services/courses';
import { ConfirmDialogComponent } from './components/confirm-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/custom-material';
import { LoginModule } from './modules/login';
import { AddCourseComponent } from './components/add-course';
import { Page404Component } from './components/page404';
import { AuthGuard } from './guards/auth.guard';
import { CoursesPageWrapperComponent } from './components/courses-page-wrapper';
import { ResponseInterceptorInterceptor } from './interceptors/response-interceptor.interceptor';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { LoadingBlockComponent } from './components/loading-block';
import { LoadService } from './services/load';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from 'src/app/effects/courses.effects';
import { CourseEffects } from 'src/app/effects/course.effects';
import { EditCourseEffects } from 'src/app/effects/editCourse.effects';
import { AuthorsComponent } from './components/authors';
import { ChipComponent } from './components/chip';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { InputDurationComponent } from './components/input-duration';
import { InputDateComponent } from './components/input-date';
import { AuthorsService } from 'src/app/services/authors/authors.service';
import { ValidateValueDirective } from './directives/validate-value';

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
