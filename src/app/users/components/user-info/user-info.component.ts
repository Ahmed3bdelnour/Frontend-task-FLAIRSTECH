import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
user: User = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
    ) { }

  ngOnInit() {
    //getting id from the url then get user by id then pass user in user Behavior subject
    this.activatedRoute.paramMap.subscribe(
      (params) => {
       let id = +params.get('id');
       this.restService.getUserById(id).subscribe(
         (user)=>{
           this.user = user;
           this.restService.userBehaviorSub.next(user);
         }, 
         (err) => {
          console.log(err);
         }
       );
      }
    );
  }

}
