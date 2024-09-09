import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {

  searchQuery: string = '';  // Ajoutez cette ligne
  
  competencesRecherchees = [
    { titre: 'Développement Web', auteur: 'John Doe' },
    { titre: 'Data Science', auteur: 'Jane Smith' },
    // Ajoutez d'autres compétences recherchées ici
  ];

  competencesDisponibles = [
    { titre: 'Marketing Digital', auteur: 'Alice Johnson' },
    { titre: 'Gestion de Projet', auteur: 'Robert Brown' },
    // Ajoutez d'autres compétences disponibles ici
  ];

  constructor() { }

  ngOnInit(): void { }
}
