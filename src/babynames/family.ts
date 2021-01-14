export class Sibling {
  ID: number
  firstname = ''
  gender = 'u'

  constructor (id: number) {
    this.ID = id
  }
}

export class Family {
  familyname = ''
  father = ''
  mother = ''
  siblings = Array<Sibling>(0)

  public addSibling () {
    this.siblings.push(new Sibling(this.siblings.length))
  }
}
