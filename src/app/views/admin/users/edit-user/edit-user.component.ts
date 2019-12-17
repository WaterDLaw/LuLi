import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  showForm: boolean;

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.showForm = false;

    // Load User
    this._usersService.getUser(this.route.snapshot.params['id'])
      .subscribe(data =>{
        this.user = data;
        this.showForm = true;
      })
  }

  onSubmit(){

console.log(this.user.userType);
    console.log(this.user.password);
    this._usersService.updateUser(this.user)
    .then(
      
        this.router.navigate(['admin'])
      
    )
    .catch(error => console.log(error));
    

  }

}
