import http from "@/utils/http"
import type { LoginResult } from '@/types/member'

type LoginH5Params = {
  account: string
  password: string
}

interface Data<T> {
  code: number,
  message: string,
  data: T
}

export const postLoginH5API = (data: LoginH5Params) => {
  return http.post<Data<LoginResult>>(
    '/api/login/h5',
    data
  )
}
