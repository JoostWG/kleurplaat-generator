<script setup lang="ts">
import FileToPixelConverter from '@/lib/services/FileToPixelConverter.ts'
import FileInput from './FileInput.vue'
import ShapeExtractor from '@/lib/services/ShapeExtractor.ts'
import { ref } from 'vue'
import type { Image, PixelColor, Shape } from '@/lib/types.js'

const fileToPixelConverter = new FileToPixelConverter()

const shapeCount = ref(0)
const pixelCount = ref(0)
const canvasElement = ref<HTMLCanvasElement>()

async function onFileUpload(event: Event): Promise<void> {
  const file = getFileFromEvent(event)

  if (file === null) {
    return
  }

  const image = await fileToPixelConverter.getImageFromFile(file)

  if (image === null) {
    return
  }

  pixelCount.value = image.pixels.length

  const shapeExtractor = new ShapeExtractor(image)

  const shapes = shapeExtractor.extract()

  shapeCount.value = shapes.length

  drawShapes(image, shapes)
}

function getFileFromEvent(event: Event): File | null {
  if (!(event.target instanceof HTMLInputElement)) {
    return null
  }

  return event.target.files?.item(0) ?? null
}

function drawShapes(image: Image, shapes: Shape[]): void {
  const canvas = canvasElement.value

  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return
  }

  canvas.width = image.width
  canvas.height = image.height

  for (const shape of shapes) {
    const averageColor: Omit<PixelColor, 'alpha'> = {
      red: average(shape.pixels.map((pixel) => pixel.color.red)),
      green: average(shape.pixels.map((pixel) => pixel.color.green)),
      blue: average(shape.pixels.map((pixel) => pixel.color.blue)),
    }

    ctx.fillStyle = `rgb(${averageColor.red}, ${averageColor.green}, ${averageColor.green})`

    for (const pixel of shape.pixels) {
      ctx.fillRect(pixel.position.x, pixel.position.y, 1, 1)
    }
  }
}

function average(values: number[]): number {
  return values.reduce((a, b) => a + b) / values.length
}
</script>

<template>
  <FileInput @input="onFileUpload" />

  <div>Jouw afbeelding heeft {{ pixelCount }} pixel{{ pixelCount !== 1 ? 's' : '' }}</div>
  <div>Aantal vlakken: {{ shapeCount }}</div>

  <div>
    <canvas ref="canvasElement"></canvas>
  </div>
</template>
