import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {
  LoginPageComponent,
  BreadcrumbsComponent,
  HeaderComponent,
  FooterComponent,
  LoginFormComponent,
  ValidationMessagesComponent,
} from 'src/app/components';
import { AuthService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  declarations: [
    LoginPageComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    ValidationMessagesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    LoginPageComponent,
    ValidationMessagesComponent,
  ],
  providers: [AuthService],
})
export class LoginModule { }
