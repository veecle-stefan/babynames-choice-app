import 'reflect-metadata'
import { plainToClass, Type } from 'class-transformer'
import rawClusters from './nameclusters.json'

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

export interface ToneSyllable {
  chars: string
  tone: number
}

export class Syllables {
  c = new Array<string>(0);
  t = new Array<number>(0);

  /**
   * Calculates the length of the entire word
   */
  public get length () : number {
    return this.formattedName.length
  }

  public get formattedName (): string {
    let completeName = ''
    for (const s of this.c) {
      completeName += s.toLocaleLowerCase()
    }
    return this.CapFirst(completeName)
  }

  public get ToneSyllables (): ToneSyllable[] {
    const result: ToneSyllable[] = []
    for (let i = 0; i < this.c.length; i++) {
      const chr = (i === 0) ? this.CapFirst(this.c[i]) : this.c[i].toLocaleLowerCase()
      result.push({ chars: chr, tone: this.t[i] })
    }
    return result
  }

  private CapFirst (name: string): string {
    return name.substring(0, 1).toLocaleUpperCase() + name.substring(1)
  }
}

export class RawSpelling {
  @Type(() => Syllables)
  syllables = new Syllables()

  gender = '';

  @Type(() => String)
  origins = new Array<string>(0);
}

export class BabyName {
  @Type(() => RawSpelling)
  spellings = new Array<RawSpelling>(0);

  @Type(() => String)
  keywords = new Array<string>(0);

  @Type(() => Number)
  relatedNameClusters = new Array<number>(0);

  @Type(() => String)
  indic = new Array<string>(0);
}

class TBabyDatabase {
  public readonly allNames: Array<BabyName>

  constructor () {
    this.allNames = []
    const typedClusters = rawClusters as BabyName[]
    for (let clusterID = 0; clusterID < typedClusters.length; clusterID++) {
      const cluster = typedClusters[clusterID]
      this.allNames[clusterID] = plainToClass(BabyName, cluster)
    }
  }
}

export const BabyDatabase = new TBabyDatabase()
