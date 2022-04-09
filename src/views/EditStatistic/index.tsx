import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Box, Flex, Input, Text } from '@uikit'
import axios from 'axios'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Swal from 'sweetalert2'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 16px 40px;
`
const EditContainer = styled(Box)`
  width: 410px;
  background: #333333;
  border-radius: 24px;
  padding: 24px;
  color: #fff;
`

const CustomInput = styled(Input)`
  background: #000;
  color: #fff;
`
const BtnSubmit = styled.button`
  background: #fdb814;
  color: #000;
  border-radius: 10px;
  height: 65px;
  font-size: 20px;
  margin-top: 30px;
  align-items: center;
  font-weight: 600;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor:pointer;
`

const EditStatistic = () => {
  const { account } = useActiveWeb3React()
  const [accessToken, setAccessToken] = useState('')
  const [inputs, setInputs] = useState({} as any)
  const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  const [owner, setOwner] = useState('')

  const getAccessToken = useCallback(async () => {
    try {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/login',
        data: {
          walletAddress: account,
        },
      })
      setAccessToken(result.data.data.accessToken)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  const getOwner = async () => {
    try {
      const getOwnerRes = await axios({
        method: 'get',
        url: 'http://116.118.49.31:8003/api/v1/invest-pools/get-owner',
      })
      setOwner(getOwnerRes.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getOwner()
  }, [])

  useEffect(() => {
    if (account) {
      getAccessToken()
    }
  }, [account, getAccessToken])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/invest-pools/update-static',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          community: parseFloat(inputs.community),
          apy: parseFloat(inputs.apy),
        },
      })
      if (result.data.statusCode === 201) {
        Swal.fire({
          title: 'Edit Statistic Successfully',
          icon: 'success',
          confirmButtonColor: '#ff6900',
          confirmButtonText: 'OK',
        }).then()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <PageWrapper>
      {account && owner && account.toLowerCase() === owner ? (
        <Flex justifyContent="center">
          <EditContainer>
            <form onSubmit={onSubmit}>
              <Text fontSize="20px" fontWeight={700} mb="20px">
                Edit Infomation Invest Page
              </Text>
              <Text fontWeight={500} mb="10px" mt="20px">
                Community
              </Text>
              <CustomInput type="number" required name="community" value={inputs.community || ''} onChange={handleChange} />
              <Text fontWeight={500} mb="10px" mt="20px">
                APY
              </Text>
              <CustomInput type="number" required name="apy" value={inputs.apy || ''} onChange={handleChange} />
              <BtnSubmit type="submit">Submit</BtnSubmit>
            </form>
          </EditContainer>
        </Flex>
      ) : null}
    </PageWrapper>
  )
}

export default EditStatistic
