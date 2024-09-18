import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserData } from '../models/user-data.model';

interface Competence {
  id: number;
  name: string;
  description?: string;
}

interface User {
  name: string;
  email: string;
  linkedin: string;
  trainingHours: number;
  skillMatches: number;
  skills: string[];
}

@Component({
  selector: 'app-competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.css']
})
export class CompetenceDetailComponent implements OnInit {
  competence: Competence | undefined;
  user!: UserData;
  competences: Competence[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Exemple de données fictives
    this.user = history.state.user;

    
  }

  openEditDialog(): void {
    // Code pour ouvrir un dialog d'édition des détails de compétence
  }

  openEditSkillsDialog(): void {
    // Code pour ouvrir un dialog d'édition des compétences
  }

  deleteCompetence(competence: Competence): void {
    // Code pour supprimer une compétence
  }
}
