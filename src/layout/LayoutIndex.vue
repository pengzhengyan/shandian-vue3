<script setup lang="ts">
import http from 'utils/http'

http.post('/api/login/h5', {
  account: '13651415812',
  password: '123456'
})
</script>

<template>
  <div>
    <h3>layout</h3>
  </div>
</template>

<style scoped lang="less"></style>