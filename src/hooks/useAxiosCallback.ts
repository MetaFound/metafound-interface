import { useCallback } from 'react'
import axios, { Method } from 'axios'
import Swal from 'sweetalert2'
import useAccessToken from './useAccessToken'

// import { useAccessTokenManager } from '../state/application/hooks'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Swal.fire({
        title: 'Session out of time. You need to sign in again.',
        icon: 'warning',
        confirmButtonColor: '#ff6900',
        confirmButtonText: 'OK',
      }).then(() => {
        // window.location.href = generateLoginUrl()
      })
    }
    return Promise.reject(error)
  }
)

export default function useAxiosCallback() {
  const [accessToken] = useAccessToken()
  console.log(1, accessToken)
  return useCallback(
    ({
      endpoint,
      method = 'GET',
      body,
      params,
      headers,
    }: {
      endpoint: string
      method?: Method
      body?: Record<string, unknown>
      accessToken?: string
      params?: Record<string, unknown>
      headers?: Record<string, unknown>
    }) => {
      return axios({
        method,
        url: `http://116.118.49.31:8003/${endpoint}`,
        data: body,
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      })
    },
    [accessToken]
  )
}
