import { Component, OnInit ,NgModule} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { DpersonsComponent } from '../dpersons/dpersons.component';
import * as emailjs from 'emailjs-com';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx'; 
import { Options } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orderdetails=Array();
  myorderhistory=new Array();
  myorders=new Array();
  gorderdetails=new Array();
  selectedName;
  selectedusername;
  users=[];
  iduser = [];
  idorder=[];
  statusArray=[];
  userassigned="";
  orderstatus="";

  constructor( private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,private http:HttpClient) { 
    //setTimeout( () => { this.refreshdata(); }, 1000 );
    this.statusArray=['Not Assigned','Delivered','In Progress','Cancelled'];
  }

  ngOnInit() {
    this.ng4LoadingSpinnerService.show();      
      setTimeout(function() {
        this.refreshdata();        
        this.ng4LoadingSpinnerService.hide();
      }.bind(this), 1000);
      
  }
  
  getusers()
  {
    console.log('in getusers');
    let ref = firebase.database().ref('Staff/');
    var i=0;
    return(ref.on('child_added', (snapshot)=>{
      var contactnumber=snapshot.key;      
      this.users[i]=new Array();
      this.users[i].contactnum=contactnumber
      //console.log('key---'+ snapshot.key);
      ref.child(snapshot.key+'/').on('child_added', (snapshot)=>{
        console.log('key---'+ snapshot.key +snapshot.val());
        if(snapshot.key=='username')
        {
          this.users[i].username=snapshot.val();
        }
      });
      i=i+1;

  }));
  }

  refreshdata(){    
     this.userassigned="";
    this.orderstatus=""; 
    this.ng4LoadingSpinnerService.show();      
      setTimeout(function() {
        this.getusers();
        this.getmyorderhistory();
        
        this.ng4LoadingSpinnerService.hide();
      }.bind(this), 300);
  }

  getmyorderhistory() {
    var i=0;
    var nflag;
    this.myorders=[];
    let ref = firebase.database().ref('/OrderHistory/');
    ref.on('child_added', (snapshot)=>{
      var orderid=snapshot.key;      
      this.myorders[i]=new Array();
      nflag=0;
      ref.child(snapshot.key+'/').on('child_added', (snapshot)=>{        
          //console.log(snapshot.key);
          nflag=1;
          this.myorders[i].orderid=orderid;
          //console.log('orderid'+orderid);
          firebase.database().ref('/OrderHistory/'+ orderid +'/').on('child_added', (snapshot)=>{
            switch(snapshot.key)
            {
            case ('orderdate'):
              this.myorders[i].orderdate=snapshot.val();
              break
            case ('address'):
              this.myorders[i].address=snapshot.val();
              break
            case ('contactnumber'):
              this.myorders[i].contactnumber=snapshot.val();
              break
            case ('restaurantid'):
              this.myorders[i].restaurantid=snapshot.val();
              firebase.database().ref('/restaurants/'+snapshot.val()+'/').on('child_added', (snapshot1)=>{
                
                switch(snapshot1.key)
                {
                case ('name'):
                console.log('>><<<<>>'+snapshot1.key+snapshot1.val() );
                    this.myorders[i].restaurantid= '('+this.myorders[i].restaurantid+ ') '+ snapshot1.val();
                }
                });
              break
            case ('packagingcharge'):
              this.myorders[i].packagingcharge=snapshot.val();
              break
            case ('deliverycharge'):
              this.myorders[i].deliverycharge=snapshot.val();
              break
            case ('totalcartamount'):
              this.myorders[i].totalcartamount=snapshot.val();
              break
            case ('assigneduser'):
              this.myorders[i].assigneduser=snapshot.val();
              console.log('assineduser......'+ this.myorders[i].assigneduser);
            case ('orderstatus'):
              this.myorders[i].orderstatus=snapshot.val();
              console.log('assineduser......'+ this.myorders[i].orderstatus);
              break
            }            
          });                 
      })
      if(nflag==1)
      i=i+1;
    })    
  }

  selectorder(value:any,event)
  {
    
    console.log(value);
    if(this.selectedName!=value)
    {
    this.selectedName=value;
    
    this.ng4LoadingSpinnerService.show();      
      setTimeout(function() {
        this.getorderhistory(value);
        this.ng4LoadingSpinnerService.hide();
      }.bind(this), 1000);
    }
  }

  // refresh(): void {
  //   window.location.reload();
  // }

  startLoadingSpinner() {
    this.ng4LoadingSpinnerService.show();
    
    setTimeout(function() {
      this.ng4LoadingSpinnerService.hide();
    }.bind(this), 4000);
  }

  getorderhistory(e1) {
    this.gorderdetails=[];
    console.log('calling row selected' + e1);
    var myorderdetails=[];
    var i=0;
    var l=0;
    //var e1=this.myorders[0].orderid;
    //this.myorders.forEach(function(el) {
        //this.myorderdetails[i]=new Array();
        //console.log('orderid---------------'+e1);
        var ref=firebase.database().ref('/OrderDetails/');
        return(ref.child(e1 +'/').on('child_added', (snapshot)=>{    
           //console.log('key---------------'+snapshot.key);
           myorderdetails[i]=new Array();
           myorderdetails[i].cartOrderId=e1;
          ref.child(e1 +'/'+snapshot.key+'/').on('child_added', (snapshot)=>{ 
            // console.log('key---------------'+snapshot.key);
            // console.log('OrderId'==snapshot.key);
            // console.log('---------------'+i);
            switch(snapshot.key)
            {
            case ('OrderId'):
              //console.log('--------------in-'+snapshot.key);
              myorderdetails[i].OrderId=snapshot.val();
              //console.log('--------------in-'+myorderdetails[i].OrderId);
              break;
            case ('Ordertype'):
              //console.log('--------------in-'+snapshot.key);
              myorderdetails[i].Ordertype=snapshot.val();
              //console.log('--------------in-'+myorderdetails[i].Ordertype);
              break;
            case ('cost'):
              //console.log('--------------in-'+snapshot.key);
              myorderdetails[i].cost=snapshot.val();
              //console.log('--------------in-'+myorderdetails[i].cost);
              break;
            case ('name'):
              //console.log('--------------in-'+snapshot.key);
              myorderdetails[i].name=snapshot.val();
              //console.log('--------------in-'+myorderdetails[i].name);
              break;
            case ('quantity'):
              //console.log('--------------in-'+snapshot.key);
              myorderdetails[i].quantity=snapshot.val();
              //console.log('--------------in-'+myorderdetails[i].quantity);
              break;
            }
          })
        this.pushorder(myorderdetails[i])      
        i=i+1; 
      }));
      //});
  }

  pushorder(myorderdetails)
  {
    var i=this.gorderdetails.length;
    this.gorderdetails[i]=new Array();
    this.gorderdetails[i]['OrderId']=myorderdetails.OrderId;
    this.gorderdetails[i].Ordertype=myorderdetails.Ordertype;
    this.gorderdetails[i].cost=myorderdetails.cost;
    this.gorderdetails[i].name=myorderdetails.name;
    this.gorderdetails[i].quantity=myorderdetails.quantity;
    this.gorderdetails[i].cartOrderId=myorderdetails.cartOrderId;
    console.log('--------------in-'+i+'>>>'+this.gorderdetails[i]['OrderId']+this.gorderdetails[i].name);
  }

  searchcontact() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInputcontact");
    filter = input.value.toUpperCase();
    table = document.getElementById("ordertable");
    tr = table.getElementsByTagName("tr");
    console.log('row length---'+tr.length);
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  searchorder(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInputorder");
    filter = input.value.toUpperCase();
    table = document.getElementById("ordertable");
    tr = table.getElementsByTagName("tr");
    console.log('row length---'+tr.length);
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  searchstatus(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInputstatus");
    filter = input.value.toUpperCase();
    table = document.getElementById("ordertable");
    tr = table.getElementsByTagName("tr");
    console.log('row length---'+tr.length);
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[11].getElementsByTagName('select')[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
  selectuser(ind,ustarget)
  {
    console.log('you selected:...' +ustarget.value+ this.iduser[ind]);
    this.userassigned=ustarget.value;
  }

  selectorderstatus(ind,ustarget)
  {
    console.log('you selected:...' +this.idorder[ind]);
    this.orderstatus=ustarget.value;
  }

  savedata(){
    // var orderef = firebase.database().ref("OrderHistory/"+this.selectedName+'/' ); 
    // var newUserRef = orderef.push();
    // newUserRef.set({ assigneduser:this.userassigned,orderstatus:this.orderstatus });
    if(this.userassigned!="" && this.orderstatus!="")
    {
      var orderef = firebase.database().ref("/OrderHistory/");  
        orderef.child(this.selectedName).update({
          assigneduser:this.userassigned,
          orderstatus:this.orderstatus
      });
    this.userassigned="";
    this.orderstatus="";
    }

    return new Promise(resolve => {
      console.log("Before API")
      this.http.get("https://api.whatsapp.com/send?phone='+'919591317407+'&text=I'm%20interested%20in%20your%20car%20for%20sale").map(response => response).subscribe(data => {
        resolve(data);
        console.log("After API",data)
      }, err => {
      });
    });


    var messagedata="some data";
    this.sendemail(this.userassigned,messagedata)
  }


  sendemail(emailid,data)
  {

   }
          
}
