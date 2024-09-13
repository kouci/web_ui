import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  user: User | undefined;
  competences: Competence[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Exemple de données fictives
    this.user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      linkedin: 'http://lien/user/profile/667898',
      trainingHours: 120,
      skillMatches: 15,
      skills: ['Angular', 'TypeScript', 'JavaScript']
    };

    this.competence = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      name: 'Compétence Exemple',
      description: 'Description de la compétence exemple'
    };

    this.competences = [
      { id: 1, name: 'Compétence 1' },
      { id: 2, name: 'Compétence 2' },
      { id: 3, name: 'Compétence 3' }
    ];
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
