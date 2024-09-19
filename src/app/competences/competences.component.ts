import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { SharyBackendService } from '../services/shary-backend/shary-backend.service';
import { UserData } from '../models/user-data.model';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar'; 
@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css'],
})
export class CompetencesComponent implements OnInit, AfterViewInit {
  searchQuery: string = '';
  users: UserData[] = [];
  pagedUsers: UserData[] = [];
  currentUser: UserData = {
    username: '',
    email: '',
    password: '',
    competences: [],
    wantedCompetences: []
  };
  pageSize: number = 6;
  isProfileVisible: boolean = false;

  favoriteUsers: { [username: string]: boolean } = {};

  @ViewChild('paginatorRecherchees') paginatorRecherchees!: MatPaginator;

  constructor(private http: HttpClient, private sharyBackend: SharyBackendService,
              private router: Router,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.sharyBackend.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        const id = Number(localStorage.getItem("id"));
        this.currentUser = this.users.find(user => user.id === id) || {} as UserData;
        if (this.currentUser) {
          this.users = this.users.filter(user => user.id !== this.currentUser.id);
        }
        this.setFavoriteList();
        this.paginateUsers(); 
      },
      (error) => {
        alert('Erreur lors de la récupération des utilisateurs');
      }
    );
  }

  ngAfterViewInit() {
    this.paginatorRecherchees.page.subscribe(() => this.paginateUsers());
  }

  filterUsers() {
    const filteredUsers = this.users.filter((user) =>
      user.competences.some((skill: any) =>
        skill.competenceName.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    this.paginateUsers(filteredUsers);
  }

  paginateUsers(filteredUsers: UserData[] = this.users) {
    const startIndex = this.paginatorRecherchees.pageIndex * this.paginatorRecherchees.pageSize;
    this.pagedUsers = filteredUsers.slice(startIndex, startIndex + this.paginatorRecherchees.pageSize);
  }

  onUserCardClick(user: UserData){
    this.router.navigate(['/competence', user.username], {
      state: { user: user } 
    });
  }

  toggleFavorite(event: MouseEvent, user: UserData) {
    event.stopPropagation(); // Empêche la navigation lors du clic sur l'icône
    this.favoriteUsers[user.username] = !this.favoriteUsers[user.username]; // Inverser l'état du favori
    console.log(user.id)
    if(user.id){
      if(this.favoriteUsers[user.username] == true){
        console.log("like")
        this.sharyBackend.likeUser(true, user.id ).subscribe(
          response => {
            const result = JSON.parse(JSON.stringify(response.data))
            console.log(result)
            console.log(result.isMatch)
           
            if(response.data.isMatch == true) {
              this.setIsMatch(user.username);
            }
          },
          error => console.log(error)
        )
        
      }
      else{
        console.log("dislike")
        this.sharyBackend.likeUser(false, user.id).subscribe(
          respose => console.log(respose)
        )
      }
    }
    
  }

  setFavoriteList(){
    this.currentUser.likedUsers?.forEach(likeduser =>{
      this.users.forEach(user =>{
        if(likeduser.username == user.username){
          this.favoriteUsers[likeduser.username] = true
        }
      })
    })
  }

  setIsMatch(username: string){
    console.log("hahah")
    this.snackBar.open('Bravo ! '+ username + ' vous à également liké, contactez le au plus vite ! ', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });     
  }
}

