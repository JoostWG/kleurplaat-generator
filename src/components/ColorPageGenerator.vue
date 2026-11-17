<script setup lang="ts">
import FileToPixelConverter from '@/lib/services/FileToPixelConverter.ts'
import FileInput from './FileInput.vue'
import ShapeExtractor from '@/lib/services/ShapeExtractor.ts'
import { ref } from 'vue'

const fileToPixelConverter = new FileToPixelConverter()

const shapeCount = ref(0)

async function onFileUpload(event: Event): Promise<void> {
  const file = getFileFromEvent(event)

  if (file === null) {
    return
  }

  const image = await fileToPixelConverter.getImageFromFile(file)

  if (image === null) {
    return
  }

  const shapeExtractor = new ShapeExtractor(image)

  const shapes = shapeExtractor.extract()

  shapeCount.value = shapes.length
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

  <div>Aantal vlakken: {{ shapeCount }}</div>
  <div>(dit doet nog niks)</div>
</template>
