import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-skills-dialog',
  templateUrl: './edit-skills-dialog.component.html',
  styleUrls: ['./edit-skills-dialog.component.css']
})
export class EditSkillsDialogComponent {
  skillControl = new FormControl('');
  filteredSkills: Observable<string[]>;
  allSkills: string[] = ['Angular', 'TypeScript', 'JavaScript', 'Python', 'Machine Learning'];
  userSkills: string[]; // Liste des compétences actuelles de l'utilisateur

  constructor(
    public dialogRef: MatDialogRef<EditSkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userSkills = data.skills;
    this.filteredSkills = this.skillControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter((skill) => skill.toLowerCase().includes(filterValue));
  }

  addSkill(skill: string): void {
    if (skill && !this.userSkills.includes(skill)) {
      this.userSkills.push(skill);
    }
    this.skillControl.setValue('');
  }

  removeSkill(skill: string): void {
    const index = this.userSkills.indexOf(skill);
    if (index >= 0) {
      this.userSkills.splice(index, 1);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.userSkills); // Retourner les compétences modifiées
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
