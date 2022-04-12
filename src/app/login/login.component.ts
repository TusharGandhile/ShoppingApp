import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public exForm!:FormGroup;

  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
   
   this.exForm=this.formbuilder.group({
     email:[''],
     password:['']
   })
  }
  login(){
    this.http.get<any>("http://localhost:3000/users").subscribe((res:any)=>{
      const user =res.find((a:any)=>{
        return a.email=== this.exForm.value.email &&  a.password === this.exForm.value.password
      });
      if(user){
        alert("login successfull");
        this.exForm.reset();
        this.router.navigate(['products'])
      }
      else{
        alert("User not found")
      }
    },err=>{
      alert("something went wrong!!")
    })
   
  }
}
