import React, { useState } from 'react'
import {
  UserIcon,
  CameraIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

export const ProfileSection = () => {
  const [profile, setProfile] = useState({
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan.ivanov@example.com',
    phone: '+7 (912) 345-67-89',
    birthDate: '1990-05-15',
    address: 'Москва, Россия',
    bio: 'Люблю путешествия и технологии. Работаю в IT-сфере более 5 лет.',
    avatar: null,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...profile })

  const stats = [
    { label: 'На счету', value: '154 230 ₽' },
    { label: 'Транзакций', value: '47' },
    { label: 'Карт', value: '3' },
    { label: 'Автоплатежей', value: '2' },
  ]

  const handleEdit = () => {
    setEditData({ ...profile })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profile })
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <UserIcon className="w-12 h-12 text-(--accent-primary)" />
        </div>
        <h1 className="text-3xl font-bold text-(--text-primary)">Профиль</h1>
        <p className="text-(--text-secondary) mt-2">
          Управление личной информацией и настройками аккаунта
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Основная информация
            </h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors"
              >
                <PencilIcon className="w-4 h-4" />
                Редактировать
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-(--bg-tertiary) text-(--text-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-secondary) transition-colors"
                >
                  Отмена
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <div className="relative">
                <div className="w-32 h-32 bg-(--bg-tertiary) rounded-full flex items-center justify-center overflow-hidden">
                  {editData.avatar ? (
                    <img
                      src={editData.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-16 h-16 text-(--text-tertiary)" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-(--accent-primary) text-white rounded-full cursor-pointer hover:bg-(--accent-hover) transition-colors">
                    <CameraIcon className="w-4 h-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex-1 grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--text-secondary) mb-2">
                    Имя
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) =>
                        handleChange('firstName', e.target.value)
                      }
                      className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                    />
                  ) : (
                    <div className="p-3 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-primary)">
                      {profile.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--text-secondary) mb-2">
                    Фамилия
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                    />
                  ) : (
                    <div className="p-3 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-primary)">
                      {profile.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-(--text-secondary) mb-2">
                  О себе
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) resize-none"
                  />
                ) : (
                  <div className="p-3 bg-(--bg-primary) text-(--text-primary) rounded-lg border border-(--border-primary) min-h-20">
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <h2 className="text-xl font-semibold text-(--text-primary) mb-6">
            Контактная информация
          </h2>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)">
              <EnvelopeIcon className="w-5 h-5 text-(--text-secondary)" />
              <div className="flex-1">
                <div className="text-sm text-(--text-secondary)">Email</div>
                <div className="text-(--text-primary)">{profile.email}</div>
              </div>
              {isEditing && (
                <button className="p-2 text-(--accent-primary) hover:text-(--accent-hover) transition-colors">
                  <PencilIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)">
              <PhoneIcon className="w-5 h-5 text-(--text-secondary)" />
              <div className="flex-1">
                <div className="text-sm text-(--text-secondary)">Телефон</div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full bg-transparent text-(--text-primary) border-none focus:outline-none"
                  />
                ) : (
                  <div className="text-(--text-primary)">{profile.phone}</div>
                )}
              </div>
              {isEditing && (
                <button className="p-2 text-(--accent-primary) hover:text-(--accent-hover) transition-colors">
                  <PencilIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)">
              <MapPinIcon className="w-5 h-5 text-(--text-secondary)" />
              <div className="flex-1">
                <div className="text-sm text-(--text-secondary)">Адрес</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full bg-transparent text-(--text-primary) border-none focus:outline-none"
                  />
                ) : (
                  <div className="text-(--text-primary)">{profile.address}</div>
                )}
              </div>
              {isEditing && (
                <button className="p-2 text-(--accent-primary) hover:text-(--accent-hover) transition-colors">
                  <PencilIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)">
              <CalendarIcon className="w-5 h-5 text-(--text-secondary)" />
              <div className="flex-1">
                <div className="text-sm text-(--text-secondary)">
                  Дата рождения
                </div>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    className="w-full bg-transparent text-(--text-primary) border-none focus:outline-none"
                  />
                ) : (
                  <div className="text-(--text-primary)">
                    {new Date(profile.birthDate).toLocaleDateString('ru-RU')}
                  </div>
                )}
              </div>
              {isEditing && (
                <button className="p-2 text-(--accent-primary) hover:text-(--accent-hover) transition-colors">
                  <PencilIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <h2 className="text-xl font-semibold text-(--text-primary) mb-6">
            Статистика аккаунта
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="text-2xl font-bold text-(--accent-primary) mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-(--text-secondary)">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Настройки аккаунта
            </h2>
          </div>

          <div className="grid gap-4">
            <button className="w-full p-4 text-left bg-(--bg-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-tertiary) transition-colors">
              <div className="font-medium text-(--text-primary)">
                Экспорт данных
              </div>
              <div className="text-sm text-(--text-secondary)">
                Скачайте копию ваших данных
              </div>
            </button>

            <button className="w-full p-4 text-left bg-(--bg-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-tertiary) transition-colors">
              <div className="font-medium text-(--text-primary)">
                Удалить аккаунт
              </div>
              <div className="text-sm text-(--text-secondary)">
                Безвозвратно удалить аккаунт и все данные
              </div>
            </button>

            <button className="w-full p-4 text-left bg-(--bg-primary) rounded-lg border border-(--border-primary) hover:bg-(--bg-tertiary) transition-colors">
              <div className="font-medium text-(--text-primary)">
                Выйти из аккаунта
              </div>
              <div className="text-sm text-(--text-secondary)">
                Завершить текущую сессию
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
