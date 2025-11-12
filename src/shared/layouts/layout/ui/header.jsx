import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import SearchInput from './search.input'
import Navigation from './navigation'

export const Header = () => {
  const userName = 'Никита'

  return (
    <>
      <header className="bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) text-white shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="bg-white/20 p-1.5 rounded-full shrink-0">
              <UserCircleIcon className="h-7 w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white/80 truncate">Добро пожаловать</p>
              <p className="font-medium text-sm truncate">{userName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <SearchInput />
          </div>
        </div>

        <div className="hidden md:block border-t border-white/20">
          <Navigation />
        </div>
      </header>

      <div className="md:hidden">
        <Navigation />
      </div>
    </>
  )
}
