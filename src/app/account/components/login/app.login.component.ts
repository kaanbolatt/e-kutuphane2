import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../../services/account.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { firstValueFrom } from 'rxjs';
import { BaseComponent } from 'src/app/shared/bases/base.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { fadeInOut, fadeInOutTransform } from 'src/app/shared/helpers/animation-helper';
import { UserLogin } from 'src/app/shared/interfaces/user-login';
import { MessageHelper } from 'src/app/shared/helpers/message-helper';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss'],
  animations: [fadeInOut, fadeInOutTransform]
})
export class AppLoginComponent extends BaseComponent implements OnInit {

  @ViewChild('passwordForEye') passwordRef: ElementRef;
  @ViewChild('eye') passwordEyeRef: ElementRef;

  jwtHelper = new JwtHelperService();

  loginForm: FormGroup;
  doktorEkleGuncelleForm: FormGroup;

  jwt: string;
  user_info: any
  dark: boolean;
  checked: boolean;
  display: boolean = false;
  isShown: boolean = false;
  sideBarDisplay: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    public router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit() {
    this.confirmPosition()
    this.isShown = true;

    setTimeout(() => {
      this.sideBarDisplay = true;
    }, 1000);
    
    this.createLoginForm();
  }
  //#region Messages
  showErrorViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'error', detail: message });
  } showSuccessViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'success', detail: message });
  }
  //#endregion Messages

  //#region Form İşlemleri
  createLoginForm() {
    this.loginForm = this.ch.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), PasswordValidator.strong]],

    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  //#endregion Form İşlemleri

  //#region Captcha
  public async getCaptchaToken(): Promise<string> {
    const source$ = this.recaptchaV3Service.execute('importantAction');
    const token = await firstValueFrom(source$);
    return token;
  }
  //#endregion Captcha

  //#region Password İşlemleri
  routeForgotPassword() {
    this.isShown = false;
  }
  onChangeEye() {
    this.uh.onChangeEye(this.passwordEyeRef, this.passwordRef);
  }
  routeparola(event: any) {
    if (event.toState == "close") {
      this.router.navigate(['/hesap/parola-yenile'])
    }
  }
  //#endregion Password İşlemleri

  //#region Submit
  async onSubmit(isResend: boolean = null) {
    if (this.loginForm.valid) {
      const captchaToken = await this.getCaptchaToken();
      const data = this.loginForm.getRawValue() as UserLogin;
      data.captchaToken = captchaToken;
      data.isResend = isResend;

      this.accountService.getToken(data).subscribe(result => {
        if (this.ch.checkResult(result)) {
          this.jwt = result.data.userInfo.jwt
          this.user_info = result.data.userInfo
          this.display = true
        } else {
          localStorage.removeItem('auth_token');
        }
      });
    }
  }
  //#endregion Submit

  //#region SMS
  phoneVerify(verifyCode: string) {

    // service gidecek telefon doğrulaması yapıp anan sayfaya yönlendirecek.
    this.ch.showLoader()
    localStorage.setItem('auth_token', this.jwt);
    localStorage.setItem('user_info', JSON.stringify(this.user_info))
    this.router.navigate(['/'])

  }

  //#endregion SMS



  confirmPosition() {

    this.confirmService.confirm({
        message: 'Sitemizde sizlere daha iyi hizmet verebilmek için gizliliğe uygun şekilde çerezler kullanmaktayız. Çerez politikalarını okuyun. ',
        header: 'Delete Confirmation',
        acceptButtonStyleClass:'primary-button',
        acceptLabel:'Kabul Et',
        rejectLabel:'Reddet',
        rejectButtonStyleClass:'secondary-button',
        icon: 'pi pi-cookie',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        },
        key: "positionDialog"
    });
}

}
