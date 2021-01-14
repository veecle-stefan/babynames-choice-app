export class Sibling {
  ID: number
  firstname = ''
  gender = 'u'

  constructor (id: number) {
    this.ID = id
  }
}

export class SyllableSound {
  syllable: number
  sound: number

  constructor (syllable: number, sound: number) {
    this.syllable = syllable
    this.sound = sound
  }
}

export enum SyllableVowel {
  Tremolo = 2,
  High = 1,
  Low = 0
}

export class Family {
  familyname = ''
  father = ''
  mother = ''
  siblings = Array<Sibling>(0)
  sound = Array<SyllableSound>(0)

  constructor () {
    // default sound shall be: \/ /\ \/
    this.addSyllable(SyllableVowel.Low)
    this.addSyllable(SyllableVowel.High)
    this.addSyllable(SyllableVowel.Low)
  }

  public addSibling () {
    this.siblings.push(new Sibling(this.siblings.length))
  }

  public addSyllable (sound = 0) {
    this.sound.push(new SyllableSound(this.sound.length, sound))
  }

  public removeLastSyllable () {
    this.sound.splice(this.sound.length - 1)
  }
}
