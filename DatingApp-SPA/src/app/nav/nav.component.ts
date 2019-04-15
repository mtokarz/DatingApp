import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Logged in successfully');
      console.log('Logged in successfully');
    }, error => {
      console.log(error);
      this.alertifyService.error(error);
    });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // returns true or false value
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
