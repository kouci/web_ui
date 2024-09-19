import { Competence } from "./competence-data.model";
import { MatchData } from "./match-data.model";

export interface UserData {
    username: string;
    email: string;
    password: string;
    competences: Competence[];
    wantedCompetences: Competence[];
    linkedin ?: string;
    id?: number;
    likedUsers?: UserData[];
    accepterMatch?: MatchData[];
  }
  