import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { fadeInOut } from 'src/app/shared/helpers/animation-helper';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInOut]
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  isShown: boolean = false;
  forgotPasswordForm: FormGroup;
  forgotStep: number = 1;

  constructor(
    private messageService: MessageService,
    public router: Router,
  ) { super(); }

  ngOnInit(): void {
    this.isShown = true
    this.createLoginForm();
  }

  //#region Form İşlemleri

  createLoginForm() {
    this.forgotPasswordForm = this.ch.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  get email() { return this.forgotPasswordForm.get('email'); }

  //#endregion Form İşlemleri

  //#region Submit
  async onSubmit(isResend: boolean = null) {
    
    if (this.forgotPasswordForm.valid) {
      this.forgotStep = 2
    }
    // const captchaToken = await this.getCaptchaToken();

    // const data = this.loginForm.getRawValue() as UserLogin;
    // data.captchaToken = captchaToken;
    // data.isResend = isResend;
    // this.accountService.getAdminToken(data).subscribe(result => {
    //   if (this.ch.checkResult(result)) {
    //     const decodedToken: UserInfo = this.jwtHelper.decodeToken(result.data.jwt);

    //       localStorage.setItem('auth_token', result.data.jwt);
    //       localStorage.setItem('user_info', JSON.stringify(decodedToken));

    //       // CommonHelper'daki global CurrentUser'a dönen sonuç tek bir sefer login olurken setleniyor.
    //       // this.ch.setCurrentUser();
    //       if (decodedToken.userType == UserType.hospital) {
    //         this.router.navigate(['/admin/hastane-anasayfa']);
    //       } else if (decodedToken.userType == UserType.laborant) {
    //         this.router.navigate(['/admin/lab-anasayfa']);
    //       } else {
    //         this.router.navigate(['/admin']);
    //       }

    //   } else {
    //     localStorage.removeItem('auth_token');
    //   }
    // });
  }
   //#endregion Submit
}
