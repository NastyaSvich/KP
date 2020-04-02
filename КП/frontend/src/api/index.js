instance.interceptors.response.use(res => {
  if (res.data.errorMessage) {
    alert(res.data.errorMessage)
    return Promise.reject(res)
  }
  return res
})

export default instance
