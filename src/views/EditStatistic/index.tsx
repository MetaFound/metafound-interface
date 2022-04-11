import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Input, Text } from '../../@uikit'
import axios from 'axios'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 16px 40px;
`

const PageContainer = styled.form`
  // background: yellow;
  background: transparent;
  padding-top: 25px;
`

const CustomContainerInput = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 15px;
  gap: 10px;
`

const HalfRow = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 48%;
  }
`

const TextInput = styled.div`
  margin-bottom: 10px;
  color: #fff;
`

const InputCustom = styled(Input)`
  background: #fff;
  color: #000;
  border: 1px solid #26213033;
  width: 100%;
`

const ButtonSubmit = styled.button`
  background-color: #fdb814;
  color: #000;
  padding: 14px 50px;
  border-radius: 25px;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  cursor: pointer;
  border: none;
`

const EditStatistic = () => {
  const { account } = useActiveWeb3React()
  const [inputs, setInputs] = useState({} as any)
  const [accessToken, setAccessToken] = useState('')
  const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  const router = useRouter()

  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/login',
        data: {
          walletAddress: account,
        },
      })
      setAccessToken(result.data.data.accessToken)
    }
    if (account) {
      getAccessToken()
    }
  }, [account])

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      idoProject: +inputs.idoProject,
      community: +inputs.community,
      apy: +inputs.apy,
    }
    try {
      await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/invest-pools/update-static',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      }).then(() => {
        Swal.fire({
          title: 'Add Statistic Successfully',
          icon: 'success',
          confirmButtonColor: '#ff6900',
          confirmButtonText: 'OK',
        }).then(() => router.push('/'))
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.message,
      })
    }
  }

  return (
    <PageWrapper>
      <PageContainer onSubmit={onSubmit}>
        <Text color="#fff" fontSize="24px" fontWeight={500}>
          Edit Statistic
        </Text>
        <CustomContainerInput>
          <HalfRow>
            <TextInput>IDO Project</TextInput>
            <InputCustom type="number" name="idoProject" value={inputs.idoProject || ''} onChange={handleChange} />
          </HalfRow>
          <HalfRow>
            <TextInput>Community</TextInput>
            <InputCustom type="number" name="community" value={inputs.community || ''} onChange={handleChange} />
          </HalfRow>
        </CustomContainerInput>

        <CustomContainerInput>
          <HalfRow>
            <TextInput>APY</TextInput>
            <InputCustom type="number" name="apy" value={inputs.apy || ''} onChange={handleChange} />
          </HalfRow>
        </CustomContainerInput>

        <ButtonSubmit style={{ marginTop: '30px' }} type="submit">
          Submit
        </ButtonSubmit>
      </PageContainer>
    </PageWrapper>
  )
}

export default EditStatistic
