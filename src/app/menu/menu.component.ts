import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public status;
  constructor(private client:HttpClient,private router:Router) { }

  ngOnInit(): void 
  {
    this.client.get("http://localhost:2000/user/getuser").subscribe((response:any)=>
    {
      this.status = response.status
    })
  }

  public logout()
  {
    this.client.get("http://localhost:2000/user/logout").subscribe((response:any)=>
    {
      this.router.navigateByUrl("/login")
    })
  }

}
