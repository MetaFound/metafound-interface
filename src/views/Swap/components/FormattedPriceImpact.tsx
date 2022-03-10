import { Percent } from '@pancakeswap/sdk'
import { warningSeverity } from 'utils/prices'
import styled from 'styled-components'
import { ONE_BIPS } from '../../../config/constants'
import { ErrorText } from './styleds'

const ErrorTextCustom = styled(ErrorText)`
  font-size: 15px;
  margin-bottom: 15px;
  color: #fff;
`

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <ErrorTextCustom severity={warningSeverity(priceImpact)}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorTextCustom>
  )
}
