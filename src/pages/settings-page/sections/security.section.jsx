import React, { useState } from 'react'
import {
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'

export const SecuritySection = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    biometricAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    suspiciousActivityAlerts: true,
    passwordLastChanged: '2024-01-15',
  })

  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'iPhone 13 Pro',
      browser: 'Safari',
      location: 'Москва, Россия',
      ip: '192.168.1.1',
      lastActive: '2 минуты назад',
      current: true,
    },
    {
      id: 2,
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'Москва, Россия',
      ip: '192.168.1.2',
      lastActive: '5 часов назад',
      current: false,
    },
    {
      id: 3,
      device: 'Android Phone',
      browser: 'Firefox',
      location: 'Санкт-Петербург, Россия',
      ip: '95.165.123.45',
      lastActive: '2 дня назад',
      current: false,
    },
  ])

  const [securityHistory, setSecurityHistory] = useState([
    {
      id: 1,
      action: 'Вход в аккаунт',
      device: 'iPhone 13 Pro',
      location: 'Москва, Россия',
      time: '2 минуты назад',
      status: 'success',
    },
    {
      id: 2,
      action: 'Изменение пароля',
      device: 'MacBook Pro',
      location: 'Москва, Россия',
      time: '1 неделю назад',
      status: 'success',
    },
    {
      id: 3,
      action: 'Попытка входа',
      device: 'Неизвестное устройство',
      location: 'Токио, Япония',
      time: '2 недели назад',
      status: 'failed',
    },
  ])

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const terminateSession = (sessionId) => {
    setActiveSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    )
  }

  const terminateAllSessions = () => {
    setActiveSessions((prev) => prev.filter((session) => session.current))
  }

  const changePassword = () => {
    // Логика смены пароля
    console.log('Change password flow started')
  }

  const setupTwoFactor = () => {
    // Логика настройки 2FA
    console.log('2FA setup flow started')
  }

  const regenerateBackupCodes = () => {
    // Логика генерации кодов
    console.log('Regenerating backup codes')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <ShieldCheckIcon className="w-12 h-12 text-(--accent-primary)" />
        </div>
        <h1 className="text-3xl font-bold text-(--text-primary)">
          Безопасность
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Управление настройками безопасности вашего аккаунта
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <KeyIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Аутентификация
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Двухфакторная аутентификация
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Дополнительная защита при входе
                </div>
              </div>
              <div className="flex items-center gap-3">
                {settings.twoFactorAuth ? (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    Включено
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                    Выключено
                  </span>
                )}
                <button
                  onClick={() =>
                    handleSettingChange(
                      'twoFactorAuth',
                      !settings.twoFactorAuth
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth
                      ? 'bg-(--accent-primary)'
                      : 'bg-(--border-primary)'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Биометрическая аутентификация
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Face ID, Touch ID, отпечаток пальца
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange('biometricAuth', !settings.biometricAuth)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.biometricAuth
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.biometricAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={changePassword}
                className="flex-1 p-3 bg-(--bg-tertiary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-secondary) transition-colors"
              >
                Сменить пароль
              </button>
              <button
                onClick={setupTwoFactor}
                className="flex-1 p-3 bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors"
              >
                Настроить 2FA
              </button>
            </div>

            {settings.twoFactorAuth && (
              <div className="p-4 bg-(--bg-tertiary) rounded-lg border border-(--border-primary)">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-(--text-primary)">
                    Резервные коды
                  </span>
                  <button
                    onClick={regenerateBackupCodes}
                    className="text-sm text-(--accent-primary) hover:text-(--accent-hover)"
                  >
                    Обновить
                  </button>
                </div>
                <p className="text-sm text-(--text-secondary)">
                  Сохраните эти коды в безопасном месте на случай, если у вас не
                  будет доступа к телефону
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <DevicePhoneMobileIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Активные сессии
            </h2>
          </div>

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-(--bg-tertiary) rounded-lg flex items-center justify-center">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-(--text-secondary)" />
                  </div>
                  <div>
                    <div className="font-medium text-(--text-primary)">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Текущая
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-(--text-secondary)">
                      {session.browser} • {session.location} •{' '}
                      {session.lastActive}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => terminateSession(session.id)}
                    className="p-2 text-(--text-secondary) hover:text-red-500 transition-colors"
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {activeSessions.length > 1 && (
              <button
                onClick={terminateAllSessions}
                className="w-full p-3 text-(--accent-primary) border border-(--border-primary) rounded-lg hover:bg-(--bg-tertiary) transition-colors"
              >
                Завершить все другие сессии
              </button>
            )}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClockIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Настройки сессии
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-3">
                Автоматический выход через
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    'sessionTimeout',
                    parseInt(e.target.value)
                  )
                }
                className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
              >
                <option value={15}>15 минут бездействия</option>
                <option value={30}>30 минут бездействия</option>
                <option value={60}>1 час бездействия</option>
                <option value={240}>4 часа бездействия</option>
                <option value={0}>Никогда</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-(--text-primary)">
                  Уведомления о входе
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Оповещать о новых входах в аккаунт
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
                  Оповещения о подозрительной активности
                </div>
                <div className="text-sm text-(--text-secondary)">
                  Уведомлять о необычных действиях
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingChange(
                    'suspiciousActivityAlerts',
                    !settings.suspiciousActivityAlerts
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.suspiciousActivityAlerts
                    ? 'bg-(--accent-primary)'
                    : 'bg-(--border-primary)'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.suspiciousActivityAlerts
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
            <ExclamationTriangleIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              История безопасности
            </h2>
          </div>

          <div className="space-y-3">
            {securityHistory.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="flex items-center gap-4">
                  {event.status === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium text-(--text-primary)">
                      {event.action}
                    </div>
                    <div className="text-sm text-(--text-secondary)">
                      {event.device} • {event.location} • {event.time}
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-(--text-secondary)" />
              </div>
            ))}

            <button className="w-full p-3 text-(--accent-primary) border border-(--border-primary) rounded-lg hover:bg-(--bg-tertiary) transition-colors">
              Показать всю историю
            </button>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <h2 className="text-xl font-semibold text-(--text-primary) mb-6">
            Быстрые действия
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-tertiary) transition-colors text-left">
              <QrCodeIcon className="w-6 h-6 text-(--accent-primary) mb-2" />
              <div className="font-medium">Настроить вход по QR-коду</div>
              <div className="text-sm text-(--text-secondary)">
                Быстрый вход с мобильного устройства
              </div>
            </button>

            <button className="p-4 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-tertiary) transition-colors text-left">
              <ShieldCheckIcon className="w-6 h-6 text-(--accent-primary) mb-2" />
              <div className="font-medium">Проверка безопасности</div>
              <div className="text-sm text-(--text-secondary)">
                Просканируйте аккаунт на уязвимости
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
