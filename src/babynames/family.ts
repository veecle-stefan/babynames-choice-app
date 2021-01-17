export class Person {
  name = ''
  gender: string

  constructor (gender = 'u') {
    this.gender = gender
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

export class PersonID {
  person: Person
  ID: number

  constructor (person: Person, ID: number) {
    this.person = person
    this.ID = ID
  }
}

export class Family {
  familyname: Person
  mother = new Person('f')
  father = new Person('m')
  siblings: Array<PersonID>
  sound: Array<SyllableSound>

  precautions = {
    grandma: false,
    grownup: false
  }

  constructor () {
    this.familyname = new Person()
    this.siblings = new Array<PersonID>(0)
    this.sound = new Array<SyllableSound>(0)
    this.resetSiblings()
    this.resetSound()
  }

  public resetSound () {
    this.sound = new Array<SyllableSound>(0)
    // default sound shall be: \/ /\ \/
    this.addSyllable(SyllableVowel.Low)
    this.addSyllable(SyllableVowel.High)
    this.addSyllable(SyllableVowel.Low)
  }

  public resetSiblings () {
    this.siblings = new Array<PersonID>(0)
    this.addSibling()
  }

  public resetFamilyName () {
    this.familyname.name = ''
  }

  public resetParents () {
    this.mother.name = ''
    this.father.name = ''
  }

  public resetPrecautions () {
    this.precautions.grandma = false
    this.precautions.grownup = false
  }

  public addSibling () {
    this.siblings.push(new PersonID(new Person('u'), this.siblings.length))
  }

  public addSyllable (sound = 0) {
    this.sound.push(new SyllableSound(this.sound.length, sound))
  }

  public removeLastSyllable () {
    this.sound.splice(this.sound.length - 1)
  }

  /**
   * Returns wether names have been assigned to
   * every item in the list.
   * Returns __true__ if the list is empty.
   * @param list A list of persons to check
   */
  public allNamesFilled (list: PersonID[]): boolean {
    for (const p of list) {
      if (p.person.name === '') return false
    }
    return true
  }
}
