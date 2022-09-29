import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }
  reactiveForm: FormGroup | any;
  submitted: false | any;
  email?: string;
  password?: string;
  data: any;
  emailVerified?: boolean;

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"), Validators.maxLength(6)]],
    })
  }
  get f() {
    return this.reactiveForm.controls;
  }


  onSubmit() {
    this.submitted = true
    if (this.reactiveForm.invalid) {
      this.reactiveForm.markAllAsTouched();
      return;
    }
    this.authService.SignIn(this.reactiveForm.value.email, this.reactiveForm.value.password).then((result: any) => {
      if (result) {
        console.log(result);
        this.router.navigate(['dashboard']);
      }
    }).catch(err => {
      console.log(err);
    })
  }


}
