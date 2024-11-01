import { Component, OnInit } from '@angular/core';
import {} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //this.authService.getUserInfo().subscribe(user => {
      this.username = 'eeeeeeeeeeee';
    //});
  }

}
