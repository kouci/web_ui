import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent implements OnInit {

searchQuery: string = '';  // Ajoutez cette ligne
  
  matchesUser = [
    { prenom: 'Elodie', nom: 'Brou', competences_communes: "angular, MYSQL" },
    { prenom: 'Sebastien', nom: 'Malard', competences_communes: "VScode, Docker, Kubernetes" },
    { prenom: 'Sophie', nom: 'Dubet', competences_communes: "VScode, Scala, Javascript" },
    { prenom: 'Elian', nom: 'Fra', competences_communes: "Typescript, Java, Node" },
  ];

  constructor() { }

  ngOnInit(): void { }

}
