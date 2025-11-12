import { BanksList } from '@modules/bank/bank.list'
import { DenominationList } from './components/denomination.list'
import { BalanceSummaryCard } from './components/balance.summary.card'
import SlotMachine from '@pages/slot'

export const HomePage = () => {
  return (
    <div>
      <BalanceSummaryCard />
      <DenominationList />
      <BanksList onBankClick={() => console.log('sdg')} />
      {/* <SlotMachine /> */}
    </div>
  )
}
