import { defineStore } from "pinia"
import { ref } from "vue"
import type { LoginResult } from '@/types/member'


export const useMemberStore = defineStore(
  'member',
  () => {
    const profile = ref<LoginResult>()
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    return {
      profile,
      setProfile
    }
  },
  {
    persist: true,
  }
)