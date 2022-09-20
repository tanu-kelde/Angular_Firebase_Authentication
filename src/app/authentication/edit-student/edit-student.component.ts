import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  reactiveForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public crudService: CrudService, private toastr: ToastrService, private location: Location,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.studentForm();
    let id = this.actRoute.snapshot.paramMap.get('id')!;
    this.crudService.getStudent(id).valueChanges().subscribe(data => {
      this.reactiveForm.setValue(data);
    })
  }


  studentForm() {
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


  get firstName() {
    return this.reactiveForm.get('firstName');
  }
  get lastName() {
    return this.reactiveForm.get('lastName');
  }
  get email() {
    return this.reactiveForm.get('email');
  }
  get mobileNumber() {
    return this.reactiveForm.get('mobileNumber');
  }


  onSubmit() {
    this.submitted = true
    if (this.reactiveForm.invalid) {
      this.reactiveForm.markAllAsTouched();
      return;
    }
    this.crudService.updateStudent(this.reactiveForm.value);
    this.ngOnInit();

    this.toastr.success(
      this.reactiveForm.controls['firstName'].value + ' updated successfully'
    );
    this.router.navigate(['student-list']);
  }

}
