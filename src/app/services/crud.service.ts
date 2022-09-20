import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  angularFirelist!:AngularFireList<any>;
  angularFireObject!: AngularFireObject<any>;

  constructor(private angularDatabase: AngularFireDatabase) { }

  AddStudent(student: Student) {
    this.angularFirelist.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber,
    });
  }

  getStudent(id: string) {
    this.angularFireObject = this.angularDatabase.object('student-list/' + id);
    return this.angularFireObject;
  }

  //  get student list
  getStudentList() {
    this.angularFirelist = this.angularDatabase.list("student-list");
    return this.angularFirelist;
  }

  // delete student
  deleteStudent(id: string) {
    this.angularFireObject = this.angularDatabase.object('student-list/' + id);
    this.angularFireObject.remove();
  }

  // update student
  updateStudent(student: Student) {
    this.angularFireObject.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    })
  }

}
