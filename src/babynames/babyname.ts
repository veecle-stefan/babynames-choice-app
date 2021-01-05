import { nameClusters } from './nameclusters'

export enum Origin {
  English = 'en',
  Italian = 'it',
  German = 'de',
  Dutch = 'nl',
  Scandinavian = 'sc',
  Iranian = 'ir',
  Norwegian = 'no',
  Danish = 'dk',
  Swedish = 'se',
  Portoguese = 'pt'
}

export interface Spelling {
  spelling: string,
  gender: string,
  origin: Array<string>,
}

export interface BabyName {
  spellings: Spelling[];
  keywords: string[];
  relatedNameClusters: number[];
}

export interface AllClusters {
  [cluster: number] : BabyName;
}

class TBabyDatabase {
  public readonly allNames: AllClusters;

  constructor () {
    this.allNames = nameClusters as AllClusters
  }
}

export const BabyDatabase = new TBabyDatabase()
