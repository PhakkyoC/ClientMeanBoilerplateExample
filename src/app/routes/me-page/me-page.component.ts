import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ScoreService} from "../../services/score/score.service";
import {Router} from "@angular/router";
import { HeaderService } from "../../shared/header/header.service";


@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  providers: [ AuthService,HeaderService]
})
export class MePageComponent implements OnInit {
  private token;

  private timer = 0;

  private on = false;

  private is_first=true;

  private count = 0;

  private intervalid;

  constructor(    private AuthService: AuthService,
                  private router:  Router,
                  private ScoreService: ScoreService,
                  private HeaderService:HeaderService
  ) { }


  imgclick(){
    if (this.timer<100){
      if (this.is_first) {
        this.is_first = !this.is_first;
        this.intervalid = setInterval(() => {
          this.interval();
        }, 100);
      }
      this.on = !this.on;
      this.count++;
    }
  }

  interval(){
    this.on = false;
    this.timer = this.timer+1;
    if(this.timer===100){
      this.clear();
      this.ScoreService.create( {"tapNum":this.count})
        .then( apiResponse => this.router.navigateByUrl('tap') )
        .catch( apiResponse => console.error(apiResponse) )
      }
    }

  clear(){
    clearInterval(this.intervalid);
  }

  ngOnInit() {
    this.token = this.AuthService.getToken();
    if(this.token===null){
      this.router.navigateByUrl('/');
    }else{
      this.HeaderService.setToken(this.token);
    }
  }

}
