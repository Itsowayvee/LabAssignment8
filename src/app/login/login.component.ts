import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();
    console.log('this.currentUser.....', this.currentUser);
    if(this.currentUser !=null) {
      this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = { username: 'vher', password: 'v123' }
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {

        this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['contacts', user]);
      } else {
        console.log('from else.........')
        this.toastService.showToast('danger', 'Login failed! Please check your username or password!', 3000);
      } 
    } else {
        console.log('from else.........')
        this.toastService.showToast('danger', 'Login failed! Please specify username or password!', 3000);
      }
    }
  }
