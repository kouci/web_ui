import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css'],
})
export class CompetencesComponent implements AfterViewInit {
  searchQuery: string = '';
  competencesRecherchees: any[] = [];
  competencesDisponibles: any[] = [];
  pagedCompetencesRecherchees: any[] = [];
  pagedCompetencesDisponibles: any[] = [];
  pageSize: number = 4; // Afficher 4 compétences par page

  @ViewChild('paginatorRecherchees') paginatorRecherchees!: MatPaginator;
  @ViewChild('paginatorDisponibles') paginatorDisponibles!: MatPaginator;

  ngOnInit() {
    this.competencesRecherchees = [
      { id: 1, titre: 'Compétence 1', auteur: 'Auteur 1' },
      { id: 2, titre: 'Compétence 2', auteur: 'Auteur 2' },
      { id: 3, titre: 'Compétence 3', auteur: 'Auteur 3' },
      { id: 4, titre: 'Compétence 4', auteur: 'Auteur 4' },
      { id: 5, titre: 'Compétence 5', auteur: 'Auteur 5' },
      { id: 6, titre: 'Compétence 6', auteur: 'Auteur 6' },
    ];
    this.competencesDisponibles = [
      { id: 7, titre: 'Compétence A', auteur: 'Auteur A' },
      { id: 8, titre: 'Compétence B', auteur: 'Auteur B' },
      { id: 9, titre: 'Compétence C', auteur: 'Auteur C' },
      { id: 10, titre: 'Compétence D', auteur: 'Auteur D' },
      { id: 11, titre: 'Compétence E', auteur: 'Auteur E' },
      { id: 12, titre: 'Compétence F', auteur: 'Auteur F' },
    ];
  }

  ngAfterViewInit() {
    this.paginateCompetences();
    this.paginatorRecherchees.page.subscribe(() => this.paginateCompetences());
    this.paginatorDisponibles.page.subscribe(() => this.paginateCompetences());
  }

  paginateCompetences() {
    this.pagedCompetencesRecherchees = this.paginate(
      this.competencesRecherchees,
      this.paginatorRecherchees
    );
    this.pagedCompetencesDisponibles = this.paginate(
      this.competencesDisponibles,
      this.paginatorDisponibles
    );
  }

  paginate(competences: any[], paginator: MatPaginator): any[] {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    return competences.slice(startIndex, startIndex + paginator.pageSize);
  }
}
