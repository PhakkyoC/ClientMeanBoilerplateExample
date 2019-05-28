import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ScoreService} from "../../services/score/score.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tap-page',
  templateUrl: './tap-page.component.html',
  providers: [ AuthService,ScoreService ]

})
export class TapPageComponent implements OnInit {
  public scores = [];


  constructor(    private AuthService: AuthService,
                  private ScoreService: ScoreService,
                  private router:  Router,

  ) { }

  ngOnInit() {
    let token = this.AuthService.getToken();
    if(token===null){
      this.router.navigateByUrl('login');
    }else{
      this.ScoreService.getScore()
        .then( apiResponse => this.provideScores(apiResponse))
        .catch( apiResponse => console.error(apiResponse) )
    }

  }

  provideScores(data){
    for (let row of data.data){
      let score = {user:"",tap:"",date:""};
      score.user = row.user.first_name;
      score.date = row.score.date;
      score.tap = row.score.tap;
      this.scores.push(score);
    }
  }

  displayedDate(date){
    let dt = new Date(date);
    let day = dt.getDate()<10 ? "0"+dt.getDate() : dt.getDate();
    let month = (dt.getMonth() + 1)<10 ? "0"+(dt.getMonth() + 1): (dt.getMonth() + 1);
    let year  = dt.getFullYear();
    let hours = dt.getHours()<10 ? "0"+dt.getHours() : dt.getHours();
    let min = dt.getMinutes()<10 ? "0"+dt.getMinutes() : dt.getMinutes();
    let sec = dt.getSeconds()<10 ? "0"+dt.getSeconds() : dt.getSeconds();

    return day + "-" + month + "-" + year + " " + hours + ":" + min + ":"  +sec;
  }

}
