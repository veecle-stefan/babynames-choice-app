import { BabyDatabase, BabyName } from './babynames'
import { Family, SyllableSound } from './family'

export interface BabyID {
  name: BabyName
  ID: number
}

abstract class NameFilter {
  enabled = true

  /**
   * Determines whether the user changed settings that
   * narrow down the search (return true) or widen the
   * search and hence have to be performed on the entire
   * name database (return false).
   * @param oldState State before user changed settings
   * @param newState State after user changed settings
   */
  public abstract update (newState: Family): boolean

  /**
   * Filters the given list by deciding of the supplied
   * item is part of it or not.
   * @param item The name to check for filter criteria
   */
  public abstract filterFunc (item: BabyName): boolean
}

class DictionaryFilter extends NameFilter {
  forbiddenLangs = 0
  public update (newState: Family): boolean {
    // if the user ticked more languages that are not allowed,
    // we can safely re-filter an existing list. Otherwise,
    // the user widened the search by unticking restrictions.
    const bNew = newState.precautions.dictionary.getEquivBits()
    const union = this.forbiddenLangs & bNew
    this.enabled = newState.precautions.dictionary.onOff
    if (union === this.forbiddenLangs) {
      // more bits were added
      this.forbiddenLangs = bNew
      return true
    } else {
      this.forbiddenLangs = bNew
      return false
    }
  }

  public filterFunc (item: BabyName): boolean {
    for (const word in item.indic) {
      const languages = item.indic[word]
      if ((this.forbiddenLangs & languages) !== 0) {
        return false // has a related word in the forbidden language(s)
      }
    }
    // didn't find anything. Is OK
    return true
  }
}

class SoundFilter extends NameFilter {
  desiredSound: SyllableSound[] = []

  private equalSound (c1: SyllableSound[], c2: SyllableSound[], len: number): boolean {
    if ((c1.length < len) || (c2.length < len)) {
      return false // cannot go through array if too short
    }
    for (let i = 0; i < len; i++) {
      const s1 = c1[i]
      const s2 = c2[i]
      if (s1 !== s2) {
        return false // there's a difference
      }
    }
    return true // no difference found
  }

  private equalToneSound (s: SyllableSound[], t: number[]): boolean {
    if (s.length !== t.length) {
      return false // cannot go through array if unequal
    }
    for (let i = 0; i < s.length; i++) {
      const sylNum = s[i].sound
      const toneNum = t[i]
      switch (sylNum) {
        case 1:
          if ((toneNum !== 4) && (toneNum !== 8)) {
            return false // not what we expected
          }
          break
        case 0:
          if ((toneNum !== 1) && (toneNum !== 2)) {
            return false // not what we expected
          }
          break
        case 2:
          if ((toneNum !== 5) && (toneNum !== 9)) {
            return false // not what we expected
          }
          break
      }
    }
    return true // no difference found
  }

  public update (newState: Family): boolean {
    this.enabled = newState.useSound
    const newSound: SyllableSound[] = this.enabled ? newState.sound : []
    if (newSound.length !== this.desiredSound.length) {
      // must use a new, wider search
      this.desiredSound = newSound.concat([]) // copy of array
      return false
    }
    // from here on, new sound == desired sound length
    const oldOverlaps = this.equalSound(newSound, this.desiredSound, this.desiredSound.length)
    this.desiredSound = newSound.concat([]) // copy of array
    return oldOverlaps
  }

  public filterFunc (item: BabyName): boolean {
    // discard all syllables that have wrong count anyway
    // Keep it, if we found at least one matching length
    const desiredLength = this.desiredSound.length
    for (const spelling of item.spellings) {
      if (spelling.syllables.t.length === desiredLength) {
        // look good, check if sound is also desired
        const isEqual = this.equalToneSound(this.desiredSound, spelling.syllables.t)
        if (isEqual) {
          return true // we keep this one
        }
      }
    }
    return false // nothing found
  }
}

class LanguageFilter extends NameFilter {
  wantedLangs = 0
  public update (newState: Family): boolean {
    // if the user ticked more languages that are not allowed,
    // we can safely re-filter an existing list. Otherwise,
    // the user widened the search by unticking restrictions.
    const bNew = newState.narrow.languages.getEquivBits()
    const union = this.wantedLangs & bNew
    this.enabled = newState.narrow.languages.onOff
    this.wantedLangs = bNew
    if (union === bNew) {
      // bits were removed
      return true
    } else {
      return false
    }
  }

  public filterFunc (item: BabyName): boolean {
    for (const s of item.spellings) {
      if ((s.origins & this.wantedLangs) !== 0) {
        return true // found a spelling in the wanted langue
      }
    }
    return false // didn't find a spelling in the wanted language
  }
}

class GenderFilter extends NameFilter {
  desiredGender = ''

  public update (newState: Family): boolean {
    this.enabled = newState.desireGender
    const newGender = this.enabled ? newState.desiredGender : ''
    if (newGender !== this.desiredGender) {
      this.desiredGender = newGender
      return false
    } else {
      this.desiredGender = newGender
      return true
    }
  }

  public filterFunc (item: BabyName): boolean {
    // go through all spellings as they are for different genders
    for (const spelling of item.spellings) {
      if (spelling.gender === this.desiredGender) {
        // this name fits
        return true
      }
    }
    return false // didn't find any that fits
  }
}

export class BabyNameFilter {
  filters: NameFilter[] = [
    new DictionaryFilter(),
    new LanguageFilter(),
    new SoundFilter(),
    new GenderFilter()
  ]

  currList: BabyID[]

  constructor () {
    this.currList = []
    // initiallly, the list is the entire database of names
    this.fullList()
  }

  private fullList () {
    this.currList = BabyDatabase.allNames.map((name, idx) => { return { name: name, ID: idx } })
  }

  /**
   * Runs all the necessary filters and returns (an asynchronous) result list
   * of names.
   * @param newQ Filter state now
   */
  public queryChanged (newQ: Family): Promise<BabyID[]> {
    // loop through all filters and ask them if they need to run
    // on the entire database or if it's fine to re-run on the
    // already filtered set
    const redolist: NameFilter[] = []
    const narrowList: NameFilter[] = []
    for (const filter of this.filters) {
      const trueSubset = filter.update(newQ)
      console.log(`The filter ${filter.constructor.name} thinks the change ${trueSubset ? 'is' : 'isn\'t'} a true subset`)
      if (trueSubset) {
        narrowList.push(filter)
      } else {
        redolist.push(filter)
      }
    }
    // check if we need to re-run on complete dataset
    if (redolist.length > 0) {
      this.fullList()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const eventually:Promise<BabyID[]> = new Promise((resolve, reject) => {
      let filteredList = redolist.reduce((list, filter) => {
        return list.filter(name => filter.enabled ? filter.filterFunc(name.name) : true)
      }, this.currList)
      filteredList = narrowList.reduce((list, filter) => {
        return list.filter(name => filter.enabled ? filter.filterFunc(name.name) : true)
      }, filteredList)
      resolve(filteredList)
    })

    return eventually.then(finalList => {
      this.currList = finalList
      return finalList
    })
  }
}
