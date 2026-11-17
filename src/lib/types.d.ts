export interface PixelPosition {
  x: number
  y: number
}

export interface PixelColor {
  red: number
  green: number
  blue: number
  alpha: number
}

export interface Pixel {
  position: PixelPosition
  color: PixelColor
}

export interface Image {
  width: number
  height: number
  pixels: Pixel[]
}

export interface Shape {
  pixels: Pixel[]
}
