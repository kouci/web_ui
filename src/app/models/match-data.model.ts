import { Competence } from "./competence-data.model";
import { UserData } from "./user-data.model";

export interface MatchData {
    id: number;
    userRequester: UserData;
    userAccepter: UserData;

  }
  