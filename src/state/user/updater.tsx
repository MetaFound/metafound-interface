import axios from 'axios'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect } from 'react'
import { useAccessTokenManager } from './hooks'
import { API_ENDPOINT } from 'config/constants/api'

export default function UserUpdater() {
  const { account } = useActiveWeb3React()
  const [accessToken, onSetAccessToken] = useAccessTokenManager()
  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/api/v1/login`,
        data: {
          walletAddress: account,
        },
      })
      if (result.data) {
        onSetAccessToken(result.data.data.accessToken)
      }
    }
    if (!accessToken && account) {
      getAccessToken()
    }
  }, [accessToken, account, onSetAccessToken])

  return null
}
