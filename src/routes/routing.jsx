import { Route, Routes } from 'react-router-dom'
import { HomePage } from '@pages/home.page'
import { TransactionsPage } from '@pages/transactions.page'
import { Deposit } from '@pages/deposit.page'
import { DepositDetails } from '@pages/deposit-details.page'

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/deposit/:id" element={<DepositDetails />} />
    </Routes>
  )
}
