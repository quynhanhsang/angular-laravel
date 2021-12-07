import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifierService } from 'angular-notifier';
import { UserLoginDto } from '../../components/model/acount/account.model';
import { AppUtilityService } from 'src/app/shared/share-service/app-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private notifier: NotifierService;
  loginDto: UserLoginDto;

  constructor(
    private router:Router,
    private authService:AuthenticationService,
    notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.loginDto = new UserLoginDto();
  }

  onSubmitLogin(){
    if (AppUtilityService.IsNullValidateForm("formLogin")) {
      this.notifier.notify('error', 'Bạn cần nhập đủ dữ liệu các trường có dấu * đỏ !!!')
      return;
    }
    this.authService.login(this.loginDto).subscribe((res:any)=>{

      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('token', JSON.stringify(res.token));
      this.router.navigate(['/dashboard']);
    },
    err=>{
      this.notifier.notify('error', 'Xảy ra lỗi khi đăng nhập!')
    })

  }

}
