import { BalanceSummaryCard } from '@components/widgets/balance.summary.card'
import { BanksList } from '@components/widgets/bank.list'
import { DenominationList } from '@components/widgets/denomination.list'
import SlotMachine from './slot'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  const handleTransaction = () => {
    navigate('/transaction')
  }

  return (
    <div>
      <BalanceSummaryCard onTransfer={handleTransaction} />
      <DenominationList />
      <BanksList />
      <SlotMachine />
    </div>
  )
}
