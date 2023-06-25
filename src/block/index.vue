<script setup lang="ts">
import { ref } from 'vue'
import { debounce, clipboard } from './util'

const props = defineProps<{
  code?: string
}>()

const codeVisible = ref(false)

const copied = ref(false)
const onCopy = debounce(async () => {
  const code = props.code ? decodeURIComponent(props.code) : ''
  if (code) {
    try {
      await clipboard(code)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 1000)
    } catch (error) {
      copied.value = false
    }
  }
})
</script>

<template>
  <section class="demo-block-container">
    <div class="demo"><slot /></div>

    <div class="desc"><slot name="desc" /></div>

    <div class="actions">
      <img
        class="icon"
        @click="codeVisible = !codeVisible"
        src="./svg/code.svg"
      />
    </div>

    <div v-if="codeVisible" class="code">
      <div class="copy">
        <img class="icon" @click="onCopy" src="./svg/copy.svg" />
        <span v-if="copied" class="copy-success">复制成功</span>
      </div>
      <slot name="code" />
    </div>
  </section>
</template>

<style url="./theme.css"></style>
