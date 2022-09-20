import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  reactiveForm!: FormGroup;
  submitted: boolean=false;
  data: any;
  constructor(private formBuilder: FormBuilder, private router: Router, public crudService: CrudService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.crudService.getStudentList();
    this.studentForm();
   
  }


  studentForm(){
    this.reactiveForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.maxLength(10)]],
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

    console.log(this.reactiveForm.value);
    this.crudService.AddStudent(this.reactiveForm.value)
    this.toastr.success(
      this.reactiveForm.controls['firstName'].value + ' successfully added!'
    );
    this.router.navigate(['/student-list']);
  }

  get firstName() {
    return this.reactiveForm.get('firstName');
  }
  get lastName() {
    return this.reactiveForm.get('lastName');
  }
  get email() {
    return this.reactiveForm.get('email');
  }
  get mobile() {
    return this.reactiveForm.get('mobileNumber');
  }

}
