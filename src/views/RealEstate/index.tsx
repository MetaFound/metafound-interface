import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import 'react-quill/dist/quill.snow.css'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMetafoundContract } from 'hooks/useContract'
import Select from 'react-select'
import unserializedTokens from 'config/constants/tokens'
import useTheme from 'hooks/useTheme'
import Trans from 'components/Trans'
import { variants } from '@uikit/components/Button/types'
import { Box, Flex, Input, Text } from '@uikit'
import { TransactionResponse } from '@ethersproject/providers'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import Swal from 'sweetalert2'
import io from 'socket.io-client'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'


const WS_URL = '116.118.49.31:8003'

function Loading() {
  return <div>Loading...</div>
}

const LazyReactQuill = Loadable({
  loader: () => import('react-quill'),
  loading: Loading,
})

const PageWrapper = styled(Box)`
  max-width: clamp(1000px, 70vw, 1238px);
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
`
const PageContainer = styled.form`
  // background: yellow;
  background: #fff;
  padding: 25px;
`

const QuillContainer = styled.div`
  height: 50vh;
  .ql-container.ql-snow {
    height: 40vh;
  }
  margin-top: 20px;
`

const HalfRow = styled.div`
  width: 48%;
`

const TextInput = styled.div`
  margin-bottom: 10px;
`
const InputCustom = styled(Input)`
  background: #fff;
  color: #000;
  border: 1px solid #26213033;
`

const ButtonSubmit = styled.button`
  background-color: #fdb814;
  color: #000;
  padding: 14px 19px;
  border-radius: 5px;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  cursor: pointer;
  border: none;
`

const socket = io(WS_URL, { transports: ['websocket'] })
socket.on('connect', () => {
  console.log('Connected')
})

const RealEsate = () => {
  const { account } = useActiveWeb3React()
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [ownerAccount, setOwner] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const contract = useMetafoundContract()
  const [inputs, setInputs] = useState({} as any)
  const [accessToken, setAccessToken] = useState('')
  const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

  const getOwner = async () => {
    const getOwnerRes = await axios({
      method: 'get',
      url: 'http://116.118.49.31:8003/api/v1/invest-pools/get-owner',
    })
    const owner = getOwnerRes.data.data
    return owner
  }

  useEffect(() => {
    async function getAccessToken() {
      const result = await axios({
        method: 'post',
        url: 'http://116.118.49.31:8003/api/v1/login',
        data: {
          walletAddress: account
        }
      })
      setAccessToken(result.data.data.accessToken)
    }
    if (account) {
      getAccessToken()
    }
  }, [account])


  useEffect(() => {
    let owner = ''

    function handleTransaction(data) {
      if (data.transaction === transactionHash) {
        Swal.fire({
          title: 'Add Pool Successfully',
          icon: 'success',
          confirmButtonColor: '#ff6900',
          confirmButtonText: 'OK',
        }).then()
      }
    }
    async function initData() {
      owner = await getOwner()
      setOwner(owner)
      socket.on(`Client-${owner.toLowerCase()}`, handleTransaction)
    }

    initData()

    return () => {
      if (socket) {
        socket.off(`Client-${owner.toLowerCase()}`)
      }
    }
  }, [transactionHash, account, router])

  const onSubmit = async (e) => {
    e.preventDefault()

    const detail = {
      land_acreage: inputs.landAcreage,
      construction_area: inputs.constructionArea,
      uses: inputs.uses,
      juridical: inputs.juridical,
      investment_time: inputs.investmentTime,
      expected_profit: inputs.expectedProfit,
      ownership_period: inputs.ownershipPeriod,
      formality_use: inputs.formalityUse,
    }

    const { name, imgUrl, thumbnail, location, video, map } = inputs
    const generalDescription = description

    const _endCtbTime = new Date(inputs.endCtbTime).getTime()
    const _closeTime = new Date(inputs.closeTime).getTime()
    if (_closeTime < _endCtbTime) {
      await Swal.fire({
        title: 'End Ctb time must be earlier than Close time',
        icon: 'error',
        confirmButtonColor: '#ff6900',
        confirmButtonText: 'OK',
      })
      return
    }

    const arrayImgUrl = imgUrl.split('\n').filter((x) => x)
    const objectUrl = {}

    arrayImgUrl.forEach((x, index) => {
      objectUrl[index + 1] = x
    })

    const _ctbToken = unserializedTokens[inputs.symbolToken.toLowerCase()].address
    const _withdrawFee = inputs.withdrawFee
    const decimals = new BigNumber(10).pow(unserializedTokens[inputs.symbolToken.toLowerCase()].decimals)
    const _totalCtbMax = new BigNumber(inputs.totalCtbMax).times(decimals)
    const _ctbMin = new BigNumber(inputs.ctbMin).times(decimals)

    const params = [_ctbToken, _withdrawFee, _totalCtbMax.toString(), _ctbMin.toString(), _endCtbTime, _closeTime]
    
    const addPoolContract: TransactionResponse = await contract.addPool(...params)
    if (addPoolContract.hash) {
      setTransactionHash(addPoolContract.hash)
      try {
        await axios({
          method: 'post',
          url: 'http://116.118.49.31:8003/api/v1/invest-pools',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            name,
            imgUrl: objectUrl,
            thumbnail,
            location,
            video,
            map,
            generalDescription,
            detail,
            transactionHash: addPoolContract.hash,
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <PageWrapper>
      {account && ownerAccount && account.toLowerCase() === ownerAccount ? (
        <PageContainer onSubmit={onSubmit}>
          <Text color="#333" fontSize="24px" fontWeight={500}>
            Contract Infomation
          </Text>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Symbol Token</TextInput>
              <InputCustom name="symbolToken" value={inputs.symbolToken || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Withdraw Fee</TextInput>
              <InputCustom name="withdrawFee" value={inputs.withdrawFee || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Total Contribute Max</TextInput>
              <InputCustom name="totalCtbMax" value={inputs.totalCtbMax || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Contribute Min</TextInput>
              <InputCustom name="ctbMin" value={inputs.ctbMin || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>End Contribute Time</TextInput>
              <InputCustom
                type="datetime-local"
                name="endCtbTime"
                value={inputs.endCtbTime || ''}
                onChange={handleChange}
              />
            </HalfRow>
            <HalfRow>
              <TextInput>Close Time</TextInput>
              <InputCustom
                type="datetime-local"
                name="closeTime"
                value={inputs.closeTime || ''}
                onChange={handleChange}
              />
            </HalfRow>
          </Flex>
          <Text color="#333" fontSize="24px" fontWeight={500} mt="25px">
            Common Infomation
          </Text>

          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Name</TextInput>
              <InputCustom name="name" value={inputs.name || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Images&apos; url</TextInput>
              <textarea style={{width: '100%', height: 100, border: '1px solid #26213033'}} name="imgUrl" value={inputs.imgUrl || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Thumbnail</TextInput>
              <InputCustom name="thumbnail" value={inputs.thumbnail || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Location</TextInput>
              <InputCustom name="location" value={inputs.location || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Video</TextInput>
              <InputCustom name="video" value={inputs.video || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Map</TextInput>
              <InputCustom name="map" value={inputs.map || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Text color="#333" fontSize="24px" fontWeight={500} mt="25px">
            Detail
          </Text>

          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Land Acreage</TextInput>
              <InputCustom name="landAcreage" value={inputs.landAcreage || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Construction Area</TextInput>
              <InputCustom name="constructionArea" value={inputs.constructionArea || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Uses</TextInput>
              <InputCustom name="uses" value={inputs.uses || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Juridical</TextInput>
              <InputCustom name="juridical" value={inputs.juridical || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Investment Time</TextInput>
              <InputCustom name="investmentTime" value={inputs.investmentTime || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Expected Profit</TextInput>
              <InputCustom name="expectedProfit" value={inputs.expectedProfit || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Flex justifyContent="space-between" mt="15px">
            <HalfRow>
              <TextInput>Ownership Period</TextInput>
              <InputCustom name="ownershipPeriod" value={inputs.ownershipPeriod || ''} onChange={handleChange} />
            </HalfRow>
            <HalfRow>
              <TextInput>Formality Use</TextInput>
              <InputCustom name="formalityUse" value={inputs.formalityUse || ''} onChange={handleChange} />
            </HalfRow>
          </Flex>
          <Text color="#333" fontSize="24px" fontWeight={500} mt="25px">
            General Description
          </Text>
          <QuillContainer>
            <LazyReactQuill theme="snow" value={description} onChange={setDescription} />
          </QuillContainer>
          <ButtonSubmit type="submit">Submit</ButtonSubmit>
        </PageContainer>
      ) : null}
    </PageWrapper>
  )
}

export default RealEsate
