import React, { useState } from 'react'
import {
  EyeIcon,
  UserIcon,
  CreditCardIcon,
  LockClosedIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

export const PrivacySection = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'contacts',
    showBalance: false,
    showLastLogin: true,
    transactionVisibility: 'private',
    allowTransactionComments: true,
    blockedUsers: ['user123', 'spammer456'],
    allowDataCollection: false,
    personalizedAds: false,
    cookies: 'essential',
    syncContacts: false,
    showMutualContacts: true,
  })

  const [newBlockedUser, setNewBlockedUser] = useState('')

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addBlockedUser = () => {
    if (
      newBlockedUser.trim() &&
      !settings.blockedUsers.includes(newBlockedUser)
    ) {
      setSettings((prev) => ({
        ...prev,
        blockedUsers: [...prev.blockedUsers, newBlockedUser.trim()],
      }))
      setNewBlockedUser('')
    }
  }

  const removeBlockedUser = (username) => {
    setSettings((prev) => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter((user) => user !== username),
    }))
  }

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      settings: settings,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `multibank-privacy-export-${new Date().getTime()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    if (
      window.confirm(
        'Вы уверены, что хотите очистить историю просмотров? Это действие нельзя отменить.'
      )
    ) {
      console.log('History cleared')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <EyeIcon className="w-12 h-12 text-(--accent-primary)" />
        </div>
        <h1 className="text-3xl font-bold text-(--text-primary)">
          Конфиденциальность
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Управление настройками приватности и видимостью ваших данных
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-(--bg-primary) rounded-2xl shadow-sm border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Видимость профиля
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-3">
                Кто может видеть ваш профиль
              </label>
              <select
                value={settings.profileVisibility}
                onChange={(e) =>
                  handleSettingChange('profileVisibility', e.target.value)
                }
                className="w-full p-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
              >
                <option value="all">Все пользователи</option>
                <option value="contacts">Только контакты</option>
                <option value="none">Только я</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Показывать баланс
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Отображение суммы на счетах в профиле
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange('showBalance', !settings.showBalance)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showBalance
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--bg-secondary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showBalance ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Показывать последний вход
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Отображение времени последней активности
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange('showLastLogin', !settings.showLastLogin)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showLastLogin
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--bg-secondary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showLastLogin ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl shadow-sm border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCardIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Транзакции
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-3">
                Видимость транзакций
              </label>
              <select
                value={settings.transactionVisibility}
                onChange={(e) =>
                  handleSettingChange('transactionVisibility', e.target.value)
                }
                className="w-full p-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
              >
                <option value="private">Только я</option>
                <option value="contacts">Только контакты</option>
                <option value="public">Все пользователи</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Разрешить комментарии к транзакциям
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Другие пользователи могут оставлять комментарии к вашим
                  транзакциям
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'allowTransactionComments',
                    !settings.allowTransactionComments
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowTransactionComments
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--bg-secondary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowTransactionComments
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl shadow-sm border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <LockClosedIcon className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Заблокированные пользователи
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newBlockedUser}
                onChange={(e) => setNewBlockedUser(e.target.value)}
                placeholder="Введите имя пользователя"
                className="flex-1 p-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
              />
              <button
                onClick={addBlockedUser}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Заблокировать
              </button>
            </div>

            <div className="space-y-2">
              {settings.blockedUsers.map((user) => (
                <div
                  key={user}
                  className="flex items-center justify-between p-3 bg-(--bg-secondary) rounded-lg"
                >
                  <span className="font-medium text-(--text-primary)">
                    @{user}
                  </span>
                  <button
                    onClick={() => removeBlockedUser(user)}
                    className="p-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {settings.blockedUsers.length === 0 && (
                <p className="text-(--text-secondary) text-center py-4">
                  Нет заблокированных пользователей
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl shadow-sm border border-(--border-primary) p-6">
          <h2 className="text-xl font-semibold text-(--text-primary) mb-6">
            Данные и отслеживание
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Сбор анонимных данных
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Помогите нам улучшить приложение
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'allowDataCollection',
                    !settings.allowDataCollection
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowDataCollection
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--bg-secondary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowDataCollection
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Персонализированная реклама
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Показ релевантных предложений
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'personalizedAds',
                    !settings.personalizedAds
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.personalizedAds
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--bg-secondary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.personalizedAds ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-3">
                Настройки Cookies
              </label>
              <select
                value={settings.cookies}
                onChange={(e) => handleSettingChange('cookies', e.target.value)}
                className="w-full p-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
              >
                <option value="all">Все cookies</option>
                <option value="essential">Только необходимые</option>
                <option value="none">Отключить все</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl shadow-sm border border-(--border-primary) p-6">
          <h2 className="text-xl font-semibold text-(--text-primary) mb-6">
            Управление данными
          </h2>

          <div className="grid gap-4">
            <button
              onClick={exportData}
              className="w-full p-4 text-left border border-(--border-primary) rounded-lg hover:bg-(--bg-secondary) transition-colors"
            >
              <div className="font-medium text-(--text-primary)">
                Экспорт данных
              </div>
              <div className="text-sm text-(--text-secondary)">
                Скачайте копию ваших данных в JSON формате
              </div>
            </button>

            <button
              onClick={clearHistory}
              className="w-full p-4 text-left border border-(--border-primary) rounded-lg hover:bg-(--bg-secondary) transition-colors"
            >
              <div className="font-medium text-(--text-primary)">
                Очистить историю просмотров
              </div>
              <div className="text-sm text-(--text-secondary)">
                Удалить историю просмотренных профилей и транзакций
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
