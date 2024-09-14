import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonalInfoDialogComponent } from '../edit-personal-info-dialog/edit-personal-info-dialog.component';
import { EditSkillsDialogComponent } from '../edit-skills-dialog/edit-skills-dialog.component';
import { UserData } from '../models/user-data.model';
import { SharyBackendService } from '../services/shary-backend/shary-backend.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {


  

  user: UserData = {
    username: '',
    email: '',
    password: '',
    competences: [],
    wantedCompetences: [],
    linkedin: ''
  }

  constructor(private dialog: MatDialog,
              private sharyBackendService: SharyBackendService,
              private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.loadUserData(localStorage.getItem("id"))
    }
  }



  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPersonalInfoDialogComponent, {
      width: '400px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user = result;
        this.sharyBackendService.patchUser(this.user).subscribe(
          response => {
            this.snackBar.open('Changements effectués', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            });     
          },
          error =>{
            this.snackBar.open('Impossible de modifier les données veuillez reesayer ulterieurement', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
          }
        )
          
      }
    });
  }

  openEditSkillsDialog(): void {
    if(this.user != null){
      const dialogRef = this.dialog.open(EditSkillsDialogComponent, {
        width: '400px',
        data: { skills: this.user.competences },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user.competences = result;
          this.sharyBackendService.patchUser(this.user).subscribe(
            response => {
              this.snackBar.open('Changements effectués', 'Fermer', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-success']
              });     
            },
            error =>{
              this.snackBar.open('Impossible de modifier les données veuillez reesayer ulterieurement', 'Fermer', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-error']
              });
            }
          );
        }
      });
    }
   
  }

  openEditWantedSkillsDialog(): void {
    if(this.user != null){
      const dialogRef = this.dialog.open(EditSkillsDialogComponent, {
        width: '400px',
        data: { skills: this.user.wantedCompetences },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.user.wantedCompetences = result;
          this.sharyBackendService.patchUser(this.user).subscribe(
            (response) => {
              console.log(response);
            }
          );
        }
      });
    }
   
  }

  loadUserData(id: any): void {
    this.sharyBackendService.getUserById(id).subscribe({
      next: (data: UserData) => {
        this.user = data;
        console.log('User data:', this.user);
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }
}
