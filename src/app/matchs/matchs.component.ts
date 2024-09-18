import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent implements OnInit, AfterViewInit {

searchQuery: string = '';
users: any[] = [];
pagedUsers: any[] = [];
pageSize: number = 6;

@ViewChild('paginatorRecherchees') paginatorRecherchees!: MatPaginator;

constructor(private http: HttpClient) {}



  ngOnInit() {

    this.http.get<any[]>('assets/data_shary.json').subscribe((data) => {
      this.users = data;
      console.log(this.users);
      this.paginateUsers();
    });
  }

  ngAfterViewInit() {
    this.paginatorRecherchees.page.subscribe(() => this.paginateUsers());
  }


  filterUsers() {
    const filteredUsers = this.users.filter((user) =>
      user.competences.some((skill: string) =>
        skill.toLowerCase().includes(this.searchQuery.toLowerCase())
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

