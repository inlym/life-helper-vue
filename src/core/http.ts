import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  }
})

export const http = instance
