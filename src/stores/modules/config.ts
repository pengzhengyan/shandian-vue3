import { defineStore } from 'pinia'
import { PageLayout } from '@/enums/config'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const pageLayout = ref<PageLayout>(PageLayout.UnKnow)
    const setPagelayout = (value: PageLayout) => {
      pageLayout.value = value
    }

    const count = ref(1)
    return {
      pageLayout,
      setPagelayout,
      count
    }
  },
  {
    // persist: true,
  }
)
