import { Competence } from "./competence-data.model";

export interface UserData {
    username: string;
    email: string;
    password: string;
    competences: Competence[];
    wantedCompetences: Competence[];
    linkedin ?: string;
  }
  