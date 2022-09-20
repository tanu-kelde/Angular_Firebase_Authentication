import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  angularFirelist?: AngularFireList<any>;
  angularFireObject?: AngularFireObject<any>;
  list: any;
  constructor(public router: Router,
    public ngZone: NgZone,
    public angularFireAuth: AngularFireAuth,
    public angulaFireStore: AngularFirestore,
    public toastr: ToastrService,
    private angularDatabase: AngularFireDatabase) {


    // saving data in localStorage when user is loggedIn  
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!)
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }


  SignIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            // this.router.navigate(['dashboard']);
            this.toastr.success(
              ' successfully signin!'
            );
            this.router.navigate(['dashboard']);

          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  SignUp(email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
        // this.router.navigate(['verify-email'])
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }


  // send email verification when new user signup
  sendVerificationMail() {
    return this.angularFireAuth.currentUser.then((u: any) => {
      u.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email']);
    }).catch(err => {
      console.log(err);
    })
  }


  //Reset Forgot Password 
  forgotPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email).then((result) => {
      window.alert("password reset email sent, check your inbox.");
    }).catch(err => {
      window.alert(err.message);
    })
  }


  //  return true when user is logged in,email is verify
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  // Sign in with google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/dashboard']);
    })
  }


  // auth login to run auth provider
  authLogin(provider: any) {
    return this.angularFireAuth.signInWithPopup(provider).then(result => {
      this.router.navigate(['dashboard']);
      this.setUserData(result.user);
    }).catch(err => {
      window.alert(err.message);
    })
  }


  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.angulaFireStore.doc(
      `users/${user.userId}`
    )
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      // photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  // signOut
  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      if (confirm('Are u sure?')) {
        localStorage.removeItem('user');
        this.router.navigate(['/sign-in']);
      }
    })
  }

}