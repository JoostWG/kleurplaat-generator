import type { Image, Shape } from '../types'

export default class ShapeExtractor {
  private cache: `${number}-${number}`[]

  public constructor(private image: Image) {
    this.cache = []
  }

  public extract(): Shape[] {
    // TODO
    return []
  }
}
