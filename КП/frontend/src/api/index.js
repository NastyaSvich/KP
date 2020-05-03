import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:8080/"
})

instance.interceptors.response.use(res => {
  if (res.data.errorMessage) {
    alert(res.data.errorMessage)
    return Promise.reject(res)
  }
  return res
})

export default instance
