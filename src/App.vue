<script setup lang="ts">
import BaseCard from './components/BaseCard.vue'
import ColorPageGenerator from './components/ColorPageGenerator.vue'
</script>

<template>
  <div class="p-4 flex flex-col gap-2 items-center text-center">
    <BaseCard>
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl">Als je dit leest dan doet de website het!</h1>

        <p>Er moet alleen nog een hoop gebeuren...</p>

        <p>
          De source code is te vinden op GitHub:
          <a
            class="text-blue-500"
            href="https://github.com/JoostWG/kleurplaat-generator"
            target="_blank"
          >
            https://github.com/JoostWG/kleurplaat-generator
          </a>
        </p>
      </div>
    </BaseCard>

    <BaseCard>
      <ColorPageGenerator />
    </BaseCard>
  </div>
</template>
