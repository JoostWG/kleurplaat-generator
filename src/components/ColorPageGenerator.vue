<script setup lang="ts">
import FileInput from './FileInput.vue'

// TODO: Move code into separate files

interface PixelPosition {
  x: number
  y: number
}

interface PixelColor {
  r: number
  g: number
  b: number
  a: number
}

interface Pixel {
  position: PixelPosition
  color: PixelColor
}

async function onFileUpload(event: Event): Promise<void> {
  const file = getFileFromEvent(event)

  if (file === null) {
    return
  }

  console.log(file)

  const pixels = await getPixelsFromFile(file)
  console.log(pixels)
}

async function getPixelsFromFile(file: File): Promise<Uint8ClampedArray | null> {
  const bitmap = await createImageBitmap(file)
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
  const ctx = canvas.getContext('2d')

  if (ctx === null) {
    return null
  }

  ctx.drawImage(bitmap, 0, 0)

  bitmap.close()

  return ctx.getImageData(0, 0, canvas.width, canvas.height).data
}

function getFileFromEvent(event: Event): File | null {
  if (!(event.target instanceof HTMLInputElement)) {
    return null
  }

  return event.target.files?.item(0) ?? null
}
</script>

<template>
  <FileInput @input="onFileUpload" />
</template>
