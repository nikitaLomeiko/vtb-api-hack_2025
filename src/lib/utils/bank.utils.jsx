export const declineAccount = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'счет'
  } else if (
    [2, 3, 4].includes(count % 10) &&
    ![12, 13, 14].includes(count % 100)
  ) {
    return 'счета'
  } else {
    return 'счетов'
  }
}

export const formatBalance = (balance) => {
  return balance.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Вычисляем общий баланс банка
export const getBankTotalBalance = (bankItem) => {
  return bankItem.accounts.reduce((sum, account) => sum + account.balance, 0)
}

export const getBankStyle = (bankName) => {
  const styles = {
    Тинькофф: {
      gradient: 'from-red-500 to-pink-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
    },
    Сбербанк: {
      gradient: 'from-green-600 to-emerald-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
    },
    'Альфа-Банк': {
      gradient: 'from-blue-600 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
    },
    ВТБ: {
      gradient: 'from-blue-800 to-indigo-600',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
    },
    Газпромбанк: {
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
    },
    Райффайзен: {
      gradient: 'from-yellow-500 to-amber-400',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
    },
    default: {
      gradient: 'from-gray-600 to-gray-500',
      bg: 'bg-gray-50',
      text: 'text-gray-700',
    },
  }
  return styles[bankName] || styles.default
}

export const getBankIcon = (bankName) => {
  const icons = {
    Тинькофф: '🏦',
    Сбербанк: '💚',
    'Альфа-Банк': '🔵',
    ВТБ: '💙',
    Газпромбанк: '🔶',
    Райффайзен: '🟡',
    default: '🏛️',
  }
  return icons[bankName] || icons.default
}

export const formatTerm = (months) => {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return `${months} месяцев`
  }

  if (remainingMonths === 0) {
    return `${years} ${declineYear(years)}`
  }

  return `${years} ${declineYear(years)} ${remainingMonths} месяцев`
}

export const declineYear = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) return 'год'
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  )
    return 'года'
  return 'лет'
}
