import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Pour afficher des messages SnackBar
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;  // Formulaire pour le login

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router

  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validation
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]], // Validation pour username
      password: ['', [Validators.required, Validators.minLength(3)]] // Validation pour password
    });
  }

  // Méthode d'authentification
  authentificate(): void {
    console.log(this.loginForm)
    // Vérifier d'abord si le formulaire est valide
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;  // Extraire les valeurs du formulaire
      this.authService.login(login, password).subscribe(
        response => {
          // Si l'authentification réussit
          if(response.jwt){
            localStorage.setItem("token", response.jwt)
            localStorage.setItem("id", response.id)
          }
          this.snackBar.open('Connexion réussie', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.router.navigate(["/dashboard"])
        },
        error => {
          // Gérer l'erreur d'authentification
          this.snackBar.open('Erreur lors de la connexion. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      // Formulaire invalide : afficher un message SnackBar
      this.snackBar.open('Veuillez remplir correctement le formulaire.', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }

}
