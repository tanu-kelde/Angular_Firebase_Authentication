import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/services/crud.service';
import { Student } from '../../services/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['$key', 'firstName', 'lastName', 'email', 'mobileNumber', 'action'];
  action: any;
  index: any = [];
  hideWhenNoStudent: boolean = false;
  noData: boolean = false
  preLoader: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: any[];
  student!: Student[];
  constructor(public crudService: CrudService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.crudService.getStudentList();
    s.snapshotChanges().subscribe(data => {
      console.log(data);
      this.student = [];
      data.forEach(item => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.student.push(a as Student);
      })
    })
  }

  dataState() {
    this.crudService.getStudentList().valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(this.student);
      // console.log(data)
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  delete(element: any) {
    console.log(element);
    if (window.confirm('Are sure you want to delete this student ?')) {
      console.log(element.$key);
      this.crudService.deleteStudent(element.$key);
      this.toastr.success(element.firstName + ' successfully deleted!');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
