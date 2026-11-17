<script setup lang="ts">
import FileToPixelConverter from '@/lib/services/FileToPixelConverter.ts'
import FileInput from './FileInput.vue'

const fileToPixelConverter = new FileToPixelConverter()

async function onFileUpload(event: Event): Promise<void> {
  const file = getFileFromEvent(event)

  if (file === null) {
    return
  }

  const image = await fileToPixelConverter.getImageFromFile(file)
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
