import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [],
})
export class HomePageComponent implements OnInit {

  private token;

  constructor(private AuthService: AuthService,
              private router:  Router,
              ) { }


  ngOnInit() {
    this.token = this.AuthService.getToken();
    if(this.token===null){
      this.router.navigateByUrl('/');
    }else{
      this.router.navigateByUrl('/me');
    }
  }

}
