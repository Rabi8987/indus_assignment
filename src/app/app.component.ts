import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { User }  from './data/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'assignment-indus';
  loginForm: FormGroup;
  username: boolean = false;
  passwordFeilds: any;
  inputs: any = ["","","","","","","",""];
  password: any;
  loginStatus: boolean = false;
  
  Users: User[] = [
    {
        id: 1,
        name: 'admin',
        password: 'secret12'
    },
    {
      id: 2,
      name: 'subadmin',
      password: 'subadmin'
  }
  ];
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
  
    this.loginForm = this.fb.group({
    username: ['']
    });
  }

  onChange(event) {
    var passwordFeilds1 = [true,false,true,false,false,true,true,false];
    var passwordFeilds2 = [false,true,false,true,false,true,false,true];
    var passwordFeilds3 = [false,true,true,true,false,false,false,true];
    var passwordFeilds4 = [true,true,true,false,false,false,true,false];
    var passwordFeilds5 = [true,false,true,true,false,true,false,false];
    for(let i = 0;i < this.Users.length;i++)
    {
      if(this.Users[i].name == event.target.value)
      {
        this.username = true;
        var c = this.randomInt(0, 5);
        (c == 1)?this.passwordFeilds = passwordFeilds1:'';
        (c == 2)?this.passwordFeilds = passwordFeilds2:'';
        (c == 3)?this.passwordFeilds = passwordFeilds3:'';
        (c == 4)?this.passwordFeilds = passwordFeilds4:'';
        (c == 5)?this.passwordFeilds = passwordFeilds5:'';
        break;
      }else{
        this.username = false;
      }
  }
}
  onSubmit() {
    var password;
    var status;
    for(let i = 0;i < this.Users.length;i++)
    {
      if(this.Users[i].name == this.loginForm.value.username)
      {
        password = this.Users[i].password;
        status = this.checklogin(password);
        break;
      }
    }
    
    if(status == true)
    {
      alert('Login')
    }else{
      alert('Failed')
    }
  }
  checklogin(password){
    this.loginStatus = false;
    var checkPass = 0;
    for(let i = 0;i < password.length;i++)
    {
      if(this.passwordFeilds[i] != false){
        if(password[i] !== this.inputs[i])
        {
          checkPass++;
          return false;
        }
      }
    }
    if(checkPass == 0){
      this.loginStatus = true;
      return this.loginStatus;
    }
  }
  OTPInput(event,index) {
    if(event.key !== 'Backspace' && event.key !== 'Tab' && event.target.value !== ' '){
      this.inputs[index] = event.target.value;
    }
  }
  randomInt(min, max){
    var check = 0;
    var c =  Math.floor(Math.random() * (max - min + 1)) + min;
    return c;
  }
}
