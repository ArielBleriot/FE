import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterModule,RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router){}
  ngOnInit(): void {
    this.fullName=localStorage.getItem('fullName')!;
  }
  isNavbarOpen = false;
  fullName:string='';
  navbarToggler() {
    this.isNavbarOpen = !this.isNavbarOpen;
   
  }
  logoutUser()
  {
    localStorage.clear();
    this.router.navigate(['/accounts/login'])
  }
}
