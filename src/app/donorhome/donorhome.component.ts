import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-donorhome',
  templateUrl: './donorhome.component.html',
  styleUrls: ['./donorhome.component.css']
})
export class DonorhomeComponent implements OnInit {
public others:any;
public group="";
public msgstatus="";
public sender=[]
  constructor(private client : HttpClient) { }


  ngOnInit(): void {
    console.log("group : ",this.group)
    this.client.get("http://localhost:2000/user/otheruser").subscribe((response:any)=>
    {
      console.log(response)
      this.others = response
    })
  }

  public search()
  {
    console.log("group : ",this.group)
    this.client.post("http://localhost:2000/user/searchuser",{group:this.group}).subscribe((response:any)=>
    {
      console.log(response)
      this.others = response
    })
  }

  public select(event)
  {
    var email = event.target.getAttribute('data-user')
    console.log(email)
    if(email!=null)
    this.sender=[email]
  }

  public send(data)
  {
    if(this.sender.length==0)
    {
      for(var x=0; x<this.others.length; x++)
      {
        var ob = this.others[x]
        this.sender.push(ob.email)
        console.log(ob)
      }
    }

    data.sender = this.sender
    console.log(data)
    this.client.post("http://localhost:2000/user/sendmail",data).subscribe((response:any)=>
    {
      this.msgstatus="Mail Sent !!"
      this.sender=[]
    })
  }

}
