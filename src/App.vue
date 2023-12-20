<script setup lang="ts">
import Layout from '@/layout/LayoutIndex.vue'
import { onBeforeMount, onMounted } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

onBeforeMount(() => {
  // 如果没有用户登录信息，则跳到登录页面
  // let hasLogged = localStorage.getItem(lOGIN_INFO)
  // if (!hasLogged) router.push({ name: 'Login' })
})

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#6b7aff');
  document.body.style.setProperty('--el-color-primary-light-9', '#6b7affd9');
  document.body.style.setProperty('--el-color-primary-light-3', '#6b7affd9');
  document.body.style.setProperty('--el-dialog-padding-primary', '0');
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
