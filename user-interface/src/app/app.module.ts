import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { ListOfCoursesComponent } from './components/list-of-courses/list-of-courses.component';
import { CourseComponent } from './components/course/course.component';
import { CoursePageComponent } from './components/course-page/course-page.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { BorderDirective } from './directives/border/border-directive';
import { NoDataComponent } from './components/no-data/no-data.component';
import { TransformTimePipe } from './pipes/transform-time/transform-time.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { DatePipe } from './pipes/date/date.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { CoursesService } from './services/courses/courses.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { LoginModule } from './modules/login/login.module';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { CoursesPageWrapperComponent } from './components/courses-page-wrapper/courses-page-wrapper.component';
import { ResponseInterceptorInterceptor } from './interceptors/response-interceptor.interceptor';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { LoadService } from './services/load/load.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from 'src/app/effects/courses.effects';
import { CourseEffects } from 'src/app/effects/course.effects';
import { EditCourseEffects } from 'src/app/effects/editCourse.effects';
import { AuthorsComponent } from './components/authors/authors.component';
import { ChipComponent } from './components/chip/chip.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { InputDurationComponent } from './components/input-duration/input-duration.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { AuthorsService } from 'src/app/services/authors/authors.service';
import { ValidateValueDirective } from './directives/validate-value/validate-value.directive';

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
