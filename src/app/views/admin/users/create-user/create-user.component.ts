import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  user: User;

  constructor(
    private _userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {

    this.user = {} as User;

  }

  onSubmit(){
    console.log(this.user);

    this._userService.createUser(this.user)
      .then(
        data => {
          console.log(data);
          this.router.navigate(['admin'])
        }
      )
      .catch(error => console.log(error));
      

  }
}
