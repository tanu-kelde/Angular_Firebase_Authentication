import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from '../guard/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {
    path: "sign-in",
    component: SigninComponent
  },
  {
    path: "sign-up",
    component: SignupComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "verify-email",
    component: VerifyEmailComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "userProfile",
    component: UserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    canActivate: [AuthGuard]
  },     
  {
    path: "edit-student/:id",
    component: EditStudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/sign-in",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
