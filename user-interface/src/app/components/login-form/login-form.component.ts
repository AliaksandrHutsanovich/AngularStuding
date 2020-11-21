import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth';
import { User } from '../../entities/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  validationMessages: Object = {
    required: 'PAGES.LOGIN.VALIDATION_MEASSAGES.REQUIRED',
    email: 'PAGES.LOGIN.VALIDATION_MEASSAGES.EMAIL',
  };

  fieldsTitles: Object = {
    email: 'PAGES.LOGIN.FORM_FIELDS.EMAIL.TITLE',
    password: 'PAGES.LOGIN.FORM_FIELDS.PASSWORD.TITLE',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

  }

  get f() { return this.form.controls; }

  validate(fieldName, errors): any {
    const messages = [];
    console.log('validate');
    if (errors) {
      Object.keys(errors).map(key => {
        messages.push(
          `
            ${this.translate.instant(this.fieldsTitles[fieldName])}
            ${this.translate.instant(this.validationMessages[key])}
          `
        );
      });
    }
    return messages;
  }

  handleClick() {
    if (this.form.valid) {
      this.authService.logIn(
        new User(
          'aaa',
          'bbb',
          this.form.get('email').value,
        ),
      );
    }
  }

}
