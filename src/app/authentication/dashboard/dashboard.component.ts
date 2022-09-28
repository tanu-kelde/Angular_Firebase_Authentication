import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
  }

  logOut() {
    if (confirm('Are you Sure?')) {
      this.authService.signOut();
    }
  }

}
