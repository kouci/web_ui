import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-personal-info-dialog',
  templateUrl: './edit-personal-info-dialog.component.html',
  styleUrls: ['./edit-personal-info-dialog.component.css']
})
export class EditPersonalInfoDialogComponent {

  user: any; // Définissez cela avec un type réel ou une interface.

  constructor(
    public dialogRef: MatDialogRef<EditPersonalInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user }; // Copier les données pour éviter les modifications directes
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Ajouter la logique pour enregistrer les modifications ici
    this.dialogRef.close(this.user);
  }
}
