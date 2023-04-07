import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-generate-account',
  templateUrl: './generate-account.component.html',
  styleUrls: ['./generate-account.component.css']
})
export class GenerateAccountComponent implements OnInit {

  generateForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateForm = new FormGroup({
      name: new FormControl(''),
      identification: new FormControl(''),
      password: new FormControl(''),
      amount: new FormControl(0),
    });
  }


  generateAccount(): void {
    console.log(this.generateForm.value);
    
    this.authService.generateAccount(this.generateForm.value).subscribe(_ => {
      this.router.navigate(['/']);
    });
  }

}
