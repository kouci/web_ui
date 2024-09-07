import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  selectedSkills: string[] = [];
  learningSkills: string[] = [];
  filteredSkills: Observable<string[]> = of([]);
  filteredLearningSkills: Observable<string[]> = of([]);
  hidePassword = true; // Variable to toggle password visibility

  allSkills: string[] = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python', 'Java', 'C++'];

  constructor(private fb: FormBuilder) {}

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

    this.filteredSkills = this.skillsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredLearningSkills = this.learningSkillsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.skillsControl.setValue(''); // Clear input after selection
    }
  }

  removeSkill(skill: string): void {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  }

  addLearningSkill(skill: string): void {
    if (!this.learningSkills.includes(skill)) {
      this.learningSkills.push(skill);
      this.learningSkillsControl.setValue(''); // Clear input after selection
    }
  }

  removeLearningSkill(skill: string): void {
    this.learningSkills = this.learningSkills.filter(s => s !== skill);
  }

  stepControl(stepper: MatStepper): void {
    if (stepper.selectedIndex === 0 && this.infoForm.invalid) {
      stepper.reset();
    } else if (stepper.selectedIndex === 1 && this.skillsForm.invalid) {
      stepper.previous();
    }
  }

  submit(): void {
    if (this.infoForm.valid && this.skillsForm.valid) {
      console.log('Form submitted successfully');
      // Traitement
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
