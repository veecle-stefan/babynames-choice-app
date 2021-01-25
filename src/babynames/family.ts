import { DictLanguageIDs, LanguageIDs } from './babynames'
import { BinarySettingsGroup, FilterSetting } from './bitstuff'

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
  desireGender = false
  desiredGender = 'u'
  familyname: Person
  mother = new Person('f')
  father = new Person('m')
  siblings: Array<PersonID>
  useSound = false
  sound: Array<SyllableSound>

  narrow: BinarySettingsGroup = {
    languages: new FilterSetting(LanguageIDs).setAllOn().saveDefault()
  }

  precautions: BinarySettingsGroup = {
    grandma: new FilterSetting(),
    grownup: new FilterSetting(),
    dictionary: new FilterSetting(DictLanguageIDs)
  }

  constructor () {
    this.familyname = new Person()
    this.siblings = new Array<PersonID>(0)
    this.sound = new Array<SyllableSound>(0)
    this.resetSiblings()
    this.resetSound()
  }

  public resetSound () {
    this.useSound = false
    this.sound = new Array<SyllableSound>(0)
    // default sound shall be: \/ /\ \/
    this.addSyllable(SyllableVowel.Low)
    this.addSyllable(SyllableVowel.High)
    this.addSyllable(SyllableVowel.Low)
  }

  public resetGender () {
    this.desireGender = false
    this.desiredGender = 'u'
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
