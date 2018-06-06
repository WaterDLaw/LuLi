import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('token')) {
            // logged in so return true
            console.log("Darf einloggen");
            return true;
        }
        
        // not logged in so redirect to login page
        console.log("Darf nicht einloggen");
        this.router.navigate(['/login']);
        return false;
    }
}