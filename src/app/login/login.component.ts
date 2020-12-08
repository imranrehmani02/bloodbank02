import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public msg='';
  constructor(private client:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  public login(frm)
  {
    console.log(frm)
    this.client.post("http://localhost:2000/user/login",frm).subscribe((response:any)=>
    {
      if(response.status==true)
      {
        this.router.navigateByUrl("/donorhome");
      }
      this.msg = response.msg
    })
  }
}
