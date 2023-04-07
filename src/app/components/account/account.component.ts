import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormControl } from '@angular/forms';
import { History } from 'src/app/models/history-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();

  accountForm: FormGroup = new FormGroup({});
  isSendMoney: boolean = false;
  
  name: string = '';
  account: string = '';
  amount: number = 0;

  history?: History[];


  constructor(
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('bearerToken')!.replace('Bearer ', '');
    const tokenPayload = this.jwtHelper.decodeToken(token);

    this.accountForm = new FormGroup({
      account: new FormControl(''),
      amount: new FormControl(0),
    });

    this.name = tokenPayload.name;
    this.account = tokenPayload.account;

    this.consultAccountAmount();
    this.consultAccountHistory();
  }


  consultAccountAmount(): void {
    this.accountService.getAccountAmount().subscribe(res => {
      if (res)
        this.amount = res;
    });
  }
  consultAccountHistory(): void {
    this.accountService.getAccountHistory().subscribe(res => {
      if (res)
        this.history = res;
    });
  }

  sendMoney(): void {
    this.accountService.sendMoney(this.accountForm.value).subscribe(_ => {
      this.consultAccountAmount();
      this.consultAccountHistory();
    });
  }
  withdrawMoney(): void {
    const amount: number = this.accountForm.controls['amount'].value as number;

    this.accountService.withdrawMoney(amount).subscribe(_ => {
      this.consultAccountAmount();
      this.consultAccountHistory();
    });
  }

  openSendMoneyModal(): void {
    this.isSendMoney = true;
    this.accountForm.reset();
  }
  openWithdrawMoneyModal(): void {
    this.isSendMoney = false;
    this.accountForm.reset();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
