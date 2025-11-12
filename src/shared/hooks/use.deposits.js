import { useEffect } from 'react'
import { useDepositStore } from '@shared/store/deposit'

export const useDeposits = () => {
  const { deposits, isLoading, error, fetchDeposits } = useDepositStore()

  useEffect(() => {
    fetchDeposits()
  }, [fetchDeposits])

  return {
    deposits,
    isLoading,
    error,
    refetch: fetchDeposits,
  }
}
