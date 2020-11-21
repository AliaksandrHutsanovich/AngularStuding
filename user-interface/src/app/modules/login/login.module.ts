import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LoginPageComponent } from '../../components/login-page';
import { BreadcrumbsComponent } from '../../components/breadcrumbs';
import { AuthService } from '../../services/auth';
import { HeaderComponent } from '../../components/header';
import { FooterComponent } from '../../components/footer';
import { LoginFormComponent } from '../../components/login-form';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from 'src/app/components/validation-messages/validation-messages.component';
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
