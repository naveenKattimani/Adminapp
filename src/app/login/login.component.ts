import { Component, OnInit } from '@angular/core';
  import { AngularFireAuth } from 'angularfire2/auth';
  import { AngularFireDatabase } from 'angularfire2/database';
  import {Router} from '@angular/router';
  import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
    email = '';
    password = '';
    loggedin: boolean = false;
    constructor(private router: Router,
      private afireauth: AngularFireAuth,
      private afiredb: AngularFireDatabase
    ) {
    }
  
    login() {
      this.afireauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.loggedin = true;
      })
    }
  }
