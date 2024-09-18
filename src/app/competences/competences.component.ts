import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css'],
})
export class CompetencesComponent implements OnInit, AfterViewInit {
  searchQuery: string = '';
  users: any[] = [];
  pagedUsers: any[] = [];
  pageSize: number = 6;
  isProfileVisible: boolean = false; // Définir la valeur initiale selon vos besoins

  @ViewChild('paginatorRecherchees') paginatorRecherchees!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data_shary.json').subscribe((data) => {
      this.users = data;
      this.paginateUsers();
    });
  }

  ngAfterViewInit() {
    this.paginatorRecherchees.page.subscribe(() => this.paginateUsers());
  }

  filterUsers() {
    const filteredUsers = this.users.filter((user) =>
      user.competences.some((skill: any) =>
        skill.comptenceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    this.paginateUsers(filteredUsers);
  }

  paginateUsers(filteredUsers: any[] = this.users) {
    const startIndex = this.paginatorRecherchees.pageIndex * this.paginatorRecherchees.pageSize;
    this.pagedUsers = filteredUsers.slice(
      startIndex,
      startIndex + this.paginatorRecherchees.pageSize
    );
  }
}
