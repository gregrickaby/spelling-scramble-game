<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>
