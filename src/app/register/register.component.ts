import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { UserData } from '../models/user-data.model';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharyBackendService } from '../services/shary-backend/shary-backend.service';
import { Competence } from '../models/competence-data.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  infoForm!: FormGroup;
  skillsForm!: FormGroup;
  skillsControl = new FormControl('');
  learningSkillsControl = new FormControl('');
  selectedSkills: Competence[] = []; // Utilisation d'objets Competence au lieu de string
  learningSkills: Competence[] = [];
  filteredSkills: Observable<Competence[]> = of([]);
  filteredLearningSkills: Observable<Competence[]> = of([]);
  hidePassword = true; // Variable to toggle password visibility
  userData: UserData = {
    username: '',
    email: '',
    password: ''
  };

  competences: Competence[] = []; // Tableau de toutes les compétences récupérées

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,  private snackBar: MatSnackBar, private sharyBackendService: SharyBackendService) {}

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.skillsForm = this.fb.group({
      skills: [''],
      learningSkills: ['']
    });

    // Récupérer les compétences depuis le backend
    this.sharyBackendService.getAllCompetences().subscribe((data: Competence[]) => {
      this.competences = data;
      this.filteredSkills = this.skillsControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSkills(value || ''))
      );

      this.filteredLearningSkills = this.learningSkillsControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSkills(value || ''))
      );
    });
  }

  // Méthode de validation de la correspondance des mots de passe
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Méthode de filtrage des compétences selon le nom
  private _filterSkills(value: string): Competence[] {
    const filterValue = value.toLowerCase();
    return this.competences.filter(skill => skill.comptenceName.toLowerCase().includes(filterValue));
  }

  // Ajouter une compétence sélectionnée
  addSkill(skill: Competence): void {
    if (!this.selectedSkills.find(s => s.comptenceName === skill.comptenceName)) {
      this.selectedSkills.push(skill);
      this.skillsControl.setValue(''); // Clear input after selection
    }
  }

  // Supprimer une compétence sélectionnée
  removeSkill(skill: Competence): void {
    this.selectedSkills = this.selectedSkills.filter(s => s.comptenceName !== skill.comptenceName);
  }

  // Ajouter une compétence en apprentissage
  addLearningSkill(skill: Competence): void {
    if (!this.learningSkills.find(s => s.comptenceName === skill.comptenceName)) {
      this.learningSkills.push(skill);
      this.learningSkillsControl.setValue(''); // Clear input after selection
    }
  }

  // Supprimer une compétence en apprentissage
  removeLearningSkill(skill: Competence): void {
    this.learningSkills = this.learningSkills.filter(s => s.comptenceName !== skill.comptenceName);
  }

  // Validation des étapes du Stepper
  stepControl(stepper: MatStepper): void {
    if (stepper.selectedIndex === 0 && this.infoForm.invalid) {
      stepper.reset();
    } else if (stepper.selectedIndex === 1 && this.skillsForm.invalid) {
      stepper.previous();
    }
  }

  // Soumission du formulaire d'inscription
  submit(): void {
    if (this.infoForm.valid && this.skillsForm.valid) {
      const formValues = this.infoForm.value;
      this.userData.username = formValues.name;
      this.userData.email = formValues.email;
      this.userData.password = formValues.password;

      this.authService.register(this.userData).subscribe(
        (response) => {
          this.snackBar.open('Inscription réussie !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackBar.open('Erreur lors de l\'inscription. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
