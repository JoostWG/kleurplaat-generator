import type { Image, Pixel, PixelPosition, Shape } from '../types'

export default class ShapeExtractor {
  private cache: Set<`${number}-${number}`>

  public constructor(private image: Image) {
    this.cache = new Set()
  }

  public extract(): Shape[] {
    this.cache = new Set()

    const shapes: Shape[] = []

    for (const pixel of this.image.pixels) {
      if (this.cache.has(this.getPositionKey(pixel.position))) {
        continue
      }

      shapes.push({ pixels: [...this.getRelatedPixelsForPixel(pixel)] })
    }

    return shapes
  }

  private *getRelatedPixelsForPixel(pixel: Pixel): Generator<Pixel> {
    const stack: Pixel[] = [pixel]

    while (stack.length > 0) {
      const currentPixel = stack.pop()!
      const key = this.getPositionKey(currentPixel.position)

      if (this.cache.has(key)) {
        continue
      }

      this.cache.add(key)

      yield currentPixel

      for (const neighbor of this.getNeighborsForPixel(currentPixel)) {
        const neighborKey = this.getPositionKey(neighbor.position)

        if (!this.cache.has(neighborKey) && this.pixelIsMatch(currentPixel, neighbor)) {
          stack.push(neighbor)
        }
      }
    }
  }

  private pixelIsMatch(pixelA: Pixel, pixelB: Pixel): boolean {
    return (
      this.colorIsMatch(pixelA.color.red, pixelB.color.red) &&
      this.colorIsMatch(pixelA.color.green, pixelB.color.green) &&
      this.colorIsMatch(pixelA.color.blue, pixelB.color.blue)
    )
  }

  private colorIsMatch(colorA: number, colorB: number): boolean {
    const margin = 5

    return colorA >= colorB - margin && colorA <= colorB + margin
  }

  private getPixel(position: PixelPosition): Pixel {
    if (!this.positionIsValid(position)) {
      throw new Error('Requested pos out of bounds')
    }

    const pixel = this.image.pixels[position.y * this.image.width + position.x]

    if (!pixel) {
      throw new Error('Invalid pixel pos requested')
    }

    return pixel
  }

  private positionIsValid(position: PixelPosition): boolean {
    return (
      position.x >= 0 &&
      position.x < this.image.width &&
      position.y >= 0 &&
      position.y < this.image.height
    )
  }

  private getPositionKey(position: PixelPosition): `${number}-${number}` {
    return `${position.x}-${position.y}`
  }

  private *getNeighborsForPixel(pixel: Pixel): Generator<Pixel> {
    if (this.positionIsValid({ x: pixel.position.x, y: pixel.position.y - 1 })) {
      yield this.getPixel({ x: pixel.position.x, y: pixel.position.y - 1 })
    }

    if (this.positionIsValid({ x: pixel.position.x + 1, y: pixel.position.y })) {
      yield this.getPixel({ x: pixel.position.x + 1, y: pixel.position.y })
    }

    if (this.positionIsValid({ x: pixel.position.x, y: pixel.position.y + 1 })) {
      yield this.getPixel({ x: pixel.position.x, y: pixel.position.y + 1 })
    }

    if (this.positionIsValid({ x: pixel.position.x - 1, y: pixel.position.y })) {
      yield this.getPixel({ x: pixel.position.x - 1, y: pixel.position.y })
    }
  }
}
