import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { User } from '../../entities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  userEmail: string;

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.authService.getUserInfo()
        .subscribe(({ email }: User) => {
          this.userEmail = email;
        });
    }
  }

  onLogOut(): void {
    this.authService.logOut();
  }

  onSelect({ target: { value } }) {
    console.log('value = ' + value);
    this.translate.setDefaultLang(value);
  }

}
