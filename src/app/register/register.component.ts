import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public msg=""
  constructor(private client : HttpClient) { }

  ngOnInit(): void {
  }

  public register(frm)
  {
    console.log(frm)
    this.client.post("http://localhost:2000/user/save",frm).subscribe((response:any)=>
    {
      this.msg = response.msg
    })
  }

}
