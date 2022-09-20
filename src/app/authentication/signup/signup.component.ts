import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/services/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  reactiveForm: FormGroup | any;
  submitted: false | any;
  userName?: string;
  email?: string;
  password?: string;
  image?: string;
  mobile?: string;
  userId?: string;
  data: any;
  emailVerified?: boolean;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"), Validators.maxLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.maxLength(10)]],
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
    this.data = this.reactiveForm.value;
    console.log(this.data);
    // let id = Math.floor(100000 + Math.random() * 900000);
    // console.log(id)
    // this.data.userId = id;
    this.data.emailVerified = true;
    this.authService.SignUp(this.data.email,this.data.password).then((result: any) => {
      this.toastr.success(
        ' successfully signup!'
      );
      window.alert("Data saved");
    }).catch(err => {
      
      window.alert(err);
    })
  }
}
