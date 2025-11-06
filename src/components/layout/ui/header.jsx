import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import SearchInput from './search.input'
import Navigation from './navigation'

const Header = () => {
  const userName = 'Алексей'

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          {/* Блок профиля */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="bg-white/20 p-1.5 rounded-full flex-shrink-0">
              <UserCircleIcon className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-blue-100 truncate">Добро пожаловать</p>
              <p className="font-medium text-sm truncate">{userName}</p>
            </div>
          </div>

          {/* Блок действий */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <SearchInput />
          </div>
        </div>

        {/* Навигация для десктопа */}
        <div className="hidden md:block border-t border-white/20">
          <Navigation />
        </div>
      </header>

      {/* Навигация для мобилок (отдельно) */}
      <div className="md:hidden">
        <Navigation />
      </div>
    </>
  )
}

export default Header
