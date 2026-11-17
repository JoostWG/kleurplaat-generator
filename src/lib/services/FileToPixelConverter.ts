import type { Image, Pixel } from '../types'

export default class FileToPixelConverter {
  public async getImageFromFile(file: File): Promise<Image | null> {
    const bitmap = await createImageBitmap(file)
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
    const ctx = canvas.getContext('2d')

    if (ctx === null) {
      return null
    }

    ctx.drawImage(bitmap, 0, 0)

    bitmap.close()

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    if (data === null) {
      return null
    }

    const totalPixelCount = data.length / 4

    const pixels: Pixel[] = []

    for (let index = 0; index < totalPixelCount; index++) {
      const offset = index * 4

      pixels.push({
        position: {
          x: index % canvas.width,
          y: Math.floor(index / canvas.width),
        },
        color: {
          red: data[offset] ?? 0,
          green: data[offset + 1] ?? 0,
          blue: data[offset + 2] ?? 0,
          alpha: data[offset + 3] ?? 0,
        },
      })
    }

    return {
      width: canvas.width,
      height: canvas.height,
      pixels: pixels,
    }
  }
}
