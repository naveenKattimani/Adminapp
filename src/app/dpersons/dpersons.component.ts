import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dpersons',
  templateUrl: './dpersons.component.html',
  styleUrls: ['./dpersons.component.css']
})
export class DpersonsComponent implements OnInit {
  username: FormControl;
  contactnum: FormControl;
  address: FormControl;
  users=new Array();
  myform: FormGroup;
  constructor(private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { 
    
  }

  ngOnInit() {
    this.ng4LoadingSpinnerService.show();      
      setTimeout(function() {
        this.getusers();
        this.createFormControls();
        this.createForm();
        //this.ng4LoadingSpinnerService.hide();
        this.users.subscribe(() => this.ng4LoadingSpinnerService.hide())
      }.bind(this), 200);
        
  }

  
  createFormControls() {
    console.log('create form contrll');
    this.username = new FormControl("", Validators.required);
    this.contactnum = new FormControl("", Validators.required);
    this.address = new FormControl("", Validators.required);
  }

  createForm() {
    console.log('create form');
    this.myform = new FormGroup({
      username: this.username,
      contactnum: this.contactnum,
      address: this.address
    });
  }

  onSubmit() {
    console.log("on Submitted!");
    if (this.myform.valid) {
      console.log("Form Submitted!");
      console.log(this.myform.value);
      var orderef = firebase.database().ref("Staff/");  
      orderef.child(this.myform.value.contactnum).set({
      username:this.myform.value.username,
      address:this.myform.value.address,
    });
    this.getusers();
    console.log('getusers');
      this.myform.reset();
      console.log('reset');
    }
    // var orderef = firebase.database().ref("Staff/");  
    // orderef.child(this.myform.co).set({
    //   userusername:this.username,
    //   address:this.address,
    // });
  }

  getusers()
  {
    console.log('in getusers');
    let ref = firebase.database().ref('Staff/');
    var i=0;
    return(ref.on('child_added', (snapshot)=>{
      var contactnumber=snapshot.key;      
      this.users[i]=new Array();
      this.users[i].contactnumber=contactnumber
      //console.log('key---'+ snapshot.key);
      ref.child(snapshot.key+'/').on('child_added', (snapshot)=>{
        console.log('key---'+ snapshot.key +snapshot.val());
        if(snapshot.key=='address')
        {
          this.users[i].address=snapshot.val();
        }
        if(snapshot.key=='username')
        {
          this.users[i].username=snapshot.val();
        }
        
      });
      i=i+1;

  }));
  
  }
}
