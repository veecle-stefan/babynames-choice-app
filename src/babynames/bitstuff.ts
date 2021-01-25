export interface BitmapLookup {
  [bit: number]: string
}

export interface ExpandedBitmap {
  [key: string]: boolean
}

class ExpandedHandler {
  _ref: BitMap

  constructor (orig: BitMap) {
    this._ref = orig
  }

  public get (target: Record<string, unknown>, property: string): unknown {
    const index: number = typeof property === 'string' ? parseInt(property) : 0
    if (!isNaN(index) && index > 0) {
      if (index === 1) console.log('READing bit 1')
      return (this._ref.bits & index) === index
    } else {
      return Reflect.get(target, property)
    }
  }

  public set (target: Record<string, unknown>, property: string, val: boolean): boolean {
    const index: number = typeof property === 'string' ? parseInt(property) : 0
    if (!isNaN(index) && index > 0) {
      if (val) {
        if (index === 1) console.log('WRITing bit 1 to TRUE')
        this._ref.bits |= index // set bit
      } else {
        if (index === 1) console.log('WRITing bit 1 to FALSE')
        this._ref.bits &= ~index // remove bit
      }
    } else {
      return Reflect.set(target, property, val)
    }
    return true
  }
}

export class BitMap {
  bits = 0 // all off
  _default = 0
  _map: BitmapLookup | null = null

  indexed = new Proxy({}, new ExpandedHandler(this))

  constructor (withMap?: BitmapLookup) {
    if (withMap) this._map = withMap
  }

  public hasMap (): boolean {
    return this._map !== null
  }

  public assignMap (m: BitmapLookup) {
    this._map = m
  }

  public clear () {
    this.bits = 0
  }

  public saveDefault () {
    this._default = this.bits
  }

  public reset () {
    this.bits = this._default
  }

  public setBit (bit: number) {
    this.bits |= bit
  }

  public clearBit (bit: number) {
    this.bits &= ~bit
  }

  /**
   * Checks wether a given bit (pattern) is currently active
   * @param bit bits to check
   */
  public isSet (bit: number): boolean {
    return (this.bits & bit) === bit
  }

  /**
   * Checks whether the given bit (pattern) is different
   * from the default (reset) value
   * @param bit bits to check
   */
  public isDifferent (bit: number): boolean {
    return ((this._default & bit) !== (this.bits & bit))
  }

  /**
   * Sets all the bits in the bitmap.
   * If a map was specified, sets all the
   * bits that can potentially be set.
   * If no map is specified, sets all
   * the bits
   */
  public setAllOn () {
    if (this._map) {
      for (const candidate in this._map) {
        const num = parseInt(candidate)
        this.bits |= num
      }
    } else {
      this.bits = 0xffffffff
    }
  }

  public first (): string {
    if (this._map) {
      return this._map[this.MSB()]
    } else {
      return ''
    }
  }

  public MSB () {
    return BitMap.MSB(this.bits)
  }

  public map (): string[] {
    if (this._map) {
      return BitMap.map(this.bits, this._map)
    } else {
      return []
    }
  }

  public static MSB (n: number) {
    n |= n >> 1
    n |= n >> 2
    n |= n >> 4
    n |= n >> 8
    n |= n >> 16
    n = n + 1
    return (n >> 1)
  }

  public static map (num: number, m: BitmapLookup): string[] {
    const flags = []
    let check = 1
    while (num) {
      const bit = num & 1
      if (bit) {
        flags.push(m[check])
      }
      num >>= 1
      check <<= 1
    }
    return flags
  }
}

export class FilterSetting {
  onOff = false
  bitMap: BitMap

  constructor (withMap?: BitmapLookup) {
    this.bitMap = new BitMap(withMap)
  }

  public hasMap (): boolean {
    return this.bitMap.hasMap()
  }

  public setAllOn (): FilterSetting {
    this.bitMap.setAllOn()
    return this
  }

  public getEquivBits (): number {
    if (this.onOff) {
      return this.bitMap.bits
    } else {
      // it's off, use the default
      return this.bitMap._default
    }
  }

  public saveDefault (): FilterSetting {
    this.bitMap.saveDefault()
    return this
  }
}

export class BinarySettingsGroup {
  [name: string]: FilterSetting
}

export class BinarySettings {
  /**
   * Goes through the supplied group and sets
   * every setting in it to 0
   * @param group Group to reset completely
   */
  public static resetSettingsGroup (group: BinarySettingsGroup) {
    for (const settingName in group) {
      const setting = group[settingName]
      setting.onOff = false
      setting.bitMap.reset()
    }
  }
}
