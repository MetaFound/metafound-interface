import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import useActiveWeb3React from './useActiveWeb3React'
import { useAccessTokenManager } from 'state/user/hooks'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useAccessToken = () => {
  const { account } = useActiveWeb3React()
  const [accessToken, onSetAccessToken] = useAccessTokenManager()
  
  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/login',
        data: {
          walletAddress: account
        }
      })
      if (result.data) {
        setAccessToken(result.data.data.accessToken)
      }
    }
    if (account) {
        getAccessToken()
    }
  }, [account])

  return useMemo(() => [accessToken, setAccessToken] as const, [accessToken, setAccessToken])

}

export default useAccessToken
