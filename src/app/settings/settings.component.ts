import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
      // Logique pour mettre à jour le mot de passe
      console.log('Mot de passe modifié');
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }
  }

  performAction(element: any): void {
    console.log(`Action effectuée: ${element.name}`);
  }
}
