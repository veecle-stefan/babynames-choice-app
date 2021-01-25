import { BabyDatabase, BabyName } from './babynames'
import { Family } from './family'

export interface BabyID {
  name: BabyName
  ID: number
}

abstract class NameFilter {
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

class LanguageFilter extends NameFilter {
  wantedLangs = 0
  public update (newState: Family): boolean {
    // if the user ticked more languages that are not allowed,
    // we can safely re-filter an existing list. Otherwise,
    // the user widened the search by unticking restrictions.
    const bNew = newState.narrow.languages.getEquivBits()
    const union = this.wantedLangs & bNew
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
      if ((s.origins.bits & this.wantedLangs) !== 0) {
        return true // found a spelling in the wanted langue
      }
    }
    return false // didn't find a spelling in the wanted language
  }
}

export class BabyNameFilter {
  filters: NameFilter[] = [
    new DictionaryFilter(),
    new LanguageFilter()
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
        return list.filter(name => filter.filterFunc(name.name))
      }, this.currList)
      filteredList = narrowList.reduce((list, filter) => {
        return list.filter(name => filter.filterFunc(name.name))
      }, filteredList)
      resolve(filteredList)
    })

    return eventually.then(finalList => {
      this.currList = finalList
      return finalList
    })
  }
}
