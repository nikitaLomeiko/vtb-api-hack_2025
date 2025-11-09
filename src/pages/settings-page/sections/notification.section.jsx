import React, { useState } from 'react'
import {
  BellIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  ShieldExclamationIcon,
  CreditCardIcon,
  MegaphoneIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'

export const NotificationsSection = () => {
  const [settings, setSettings] = useState({
    // Push уведомления
    pushTransactions: true,
    pushSecurity: true,
    pushPromotions: false,
    pushSystem: true,

    // Email уведомления
    emailTransactions: true,
    emailSecurity: true,
    emailPromotions: false,
    emailNewsletter: true,

    // SMS уведомления
    smsTransactions: false,
    smsSecurity: true,
    smsPromotions: false,

    // Специфичные уведомления
    loginAlerts: true,
    largeTransactions: true,
    suspiciousActivity: true,
    paymentReminders: false,
    cardOperations: true,
    investmentAlerts: true,
    budgetAlerts: false,
  })

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: '22:00',
    end: '08:00',
  })

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleQuietHoursChange = (key, value) => {
    setQuietHours((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const toggleAllPush = (enabled) => {
    setSettings((prev) => ({
      ...prev,
      pushTransactions: enabled,
      pushSecurity: enabled,
      pushPromotions: enabled,
      pushSystem: enabled,
    }))
  }

  const toggleAllEmail = (enabled) => {
    setSettings((prev) => ({
      ...prev,
      emailTransactions: enabled,
      emailSecurity: enabled,
      emailPromotions: enabled,
      emailNewsletter: enabled,
    }))
  }

  const toggleAllSMS = (enabled) => {
    setSettings((prev) => ({
      ...prev,
      smsTransactions: enabled,
      smsSecurity: enabled,
      smsPromotions: enabled,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <BellIcon className="w-12 h-12 text-(--accent-primary)" />
        </div>
        <h1 className="text-3xl font-bold text-(--text-primary)">
          Уведомления
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Управление уведомлениями и оповещениями
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <DevicePhoneMobileIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Push-уведомления
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-(--text-primary)">
                Все Push-уведомления
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllPush(true)}
                  className="px-3 py-1 text-sm bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors"
                >
                  Включить все
                </button>
                <button
                  onClick={() => toggleAllPush(false)}
                  className="px-3 py-1 text-sm bg-(--bg-tertiary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-secondary) transition-colors"
                >
                  Выключить все
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Транзакции и операции
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Уведомления о пополнениях, переводах и платежах
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'pushTransactions',
                      !settings.pushTransactions
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushTransactions
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushTransactions
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Безопасность
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Входы в аккаунт и подозрительная активность
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange('pushSecurity', !settings.pushSecurity)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushSecurity
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushSecurity ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Акции и предложения
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Специальные предложения и промо-акции
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'pushPromotions',
                      !settings.pushPromotions
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushPromotions
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushPromotions
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Системные уведомления
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Обновления приложения и технические работы
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange('pushSystem', !settings.pushSystem)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushSystem
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushSystem ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <EnvelopeIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Email-уведомления
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-(--text-primary)">
                Все Email-уведомления
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllEmail(true)}
                  className="px-3 py-1 text-sm bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors"
                >
                  Включить все
                </button>
                <button
                  onClick={() => toggleAllEmail(false)}
                  className="px-3 py-1 text-sm bg-(--bg-tertiary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-secondary) transition-colors"
                >
                  Выключить все
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Ежемесячные выписки
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Отчеты по транзакциям за месяц
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'emailTransactions',
                      !settings.emailTransactions
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailTransactions
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailTransactions
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Уведомления безопасности
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Критические события безопасности
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'emailSecurity',
                      !settings.emailSecurity
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailSecurity
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailSecurity ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Новости и обновления
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Новые функции и улучшения
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'emailNewsletter',
                      !settings.emailNewsletter
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNewsletter
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNewsletter
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              SMS-уведомления
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-(--text-primary)">
                Все SMS-уведомления
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllSMS(true)}
                  className="px-3 py-1 text-sm bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors"
                >
                  Включить все
                </button>
                <button
                  onClick={() => toggleAllSMS(false)}
                  className="px-3 py-1 text-sm bg-(--bg-tertiary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-secondary) transition-colors"
                >
                  Выключить все
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Крупные транзакции
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    SMS при операциях свыше 10,000 ₽
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'smsTransactions',
                      !settings.smsTransactions
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.smsTransactions
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.smsTransactions
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-(--text-primary)">
                    Экстренные уведомления
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    Критические события безопасности
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange('smsSecurity', !settings.smsSecurity)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.smsSecurity
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.smsSecurity ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldExclamationIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Специфичные уведомления
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Уведомления о входе
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Оповещения о новых входах в аккаунт
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange('loginAlerts', !settings.loginAlerts)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.loginAlerts
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Крупные операции
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Уведомления о транзакциях свыше 50,000 ₽
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'largeTransactions',
                    !settings.largeTransactions
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.largeTransactions
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.largeTransactions
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Операции с картами
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Уведомления о всех операциях по картам
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'cardOperations',
                    !settings.cardOperations
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.cardOperations
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.cardOperations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Инвестиционные уведомления
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Изменения курсов и пороговые значения
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'investmentAlerts',
                    !settings.investmentAlerts
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.investmentAlerts
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.investmentAlerts
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <CalendarIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Тихие часы
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Включить тихие часы
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Не беспокоить в указанное время
                </div>
              </div>
              <button
                onClick={() =>
                  handleQuietHoursChange('enabled', !quietHours.enabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  quietHours.enabled
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Начало
                  </label>
                  <input
                    type="time"
                    value={quietHours.start}
                    onChange={(e) =>
                      handleQuietHoursChange('start', e.target.value)
                    }
                    className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Конец
                  </label>
                  <input
                    type="time"
                    value={quietHours.end}
                    onChange={(e) =>
                      handleQuietHoursChange('end', e.target.value)
                    }
                    className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
