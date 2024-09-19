import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  availabilityStartDate!: string;
  availabilityEndDate!: string;
  availabilityStatus!: string;
  oldPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
  absenceReason!: string; // Ajout de la propriété absenceReason
  isProfileVisible: boolean = true; // Propriété pour la visibilité du profil

  // Données pour les actions (exemple)
  actions: any[] = [
    { name: 'Disponibilité', action: 'check' },
    { name: 'Modifier le mot de passe', action: 'check' }
  ];
  displayedColumns: string[] = ['name', 'action'];

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // Initialisez les valeurs par défaut si nécessaire
    this.availabilityStartDate = '';
    this.availabilityEndDate = '';
    this.availabilityStatus = 'available';
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
    this.absenceReason = ''; // Initialisation de absenceReason
  }

  changePassword(): void {
    if (this.newPassword === this.confirmNewPassword) {
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
        response => {
          this.snackBar.open('Le mot de pase à été modifié', 'Fermer', {
            duration: 30000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        error =>{
          this.snackBar.open("Le mot de passe n'a pas pu être modifié", 'Fermer', {
            duration: 30000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      )
      console.log('Mot de passe modifié');
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }
  }

  performAction(element: any): void {
    console.log(`Action effectuée: ${element.name}`);
  }
}
