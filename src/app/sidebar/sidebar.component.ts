import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;  // Etat initial de la barre latérale

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
