import { useCallback } from 'react'
import axios, { Method } from 'axios'
import Swal from 'sweetalert2'
import { useAccessTokenManager } from 'state/user/hooks'
import {API_ENDPOINT} from 'config/constants/api'
import useActiveWeb3React from './useActiveWeb3React'

export default function useAxiosCallback() {
  const [accessToken, onSetAccessToken] = useAccessTokenManager()
  const { account } = useActiveWeb3React()

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
          url: `${API_ENDPOINT}/${endpoint}`,
          data: body,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken || ''}`,
          },
          params,
        }).catch((e) => {
          if (e.response.status === 401) {
            Swal.fire({
              title: 'session has expired, please try again!',
              icon: 'warning',
              confirmButtonColor: '#ff6900',
              confirmButtonText: 'Ok',
            }).then(async () => {
              const result = await axios({
                method: 'post',
                url: `${API_ENDPOINT}/api/v1/login`,
                data: {
                  walletAddress: account
                }
              })
              if (result.data) {
                  onSetAccessToken(result.data.data.accessToken)
              }
            })
          }
        })

    },
    [accessToken, account, onSetAccessToken]
  )
}
