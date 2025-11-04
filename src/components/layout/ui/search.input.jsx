import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchInput = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search for:", searchQuery);
      handleCloseSearch();
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      handleCloseSearch();
    }
  };

  // Закрытие по клику вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Десктопная версия - инпут выдвигается плавно
  if (!isMobile) {
    return (
      <div ref={containerRef} className="relative flex items-center">
        {/* Контейнер инпута с анимацией */}
        <div className={`
          flex items-center bg-white rounded-2xl overflow-hidden transition-all duration-300
          ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}
        `}>
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleEscapeKey}
              placeholder="Поиск операций, услуг..."
              className="flex-1 px-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none text-sm w-full"
            />
            <button 
              type="submit"
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
            </button>
          </form>
        </div>

        {/* Иконка лупы - всегда видна на десктопе */}
        <button 
          className={`p-2 hover:bg-white/10 rounded-full transition-all duration-300 active:scale-95 ml-2
            ${isSearchOpen ? 'bg-white/20' : ''}
          `}
          onClick={() => setIsSearchOpen(true)}
          aria-label="Открыть поиск"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    );
  }

  // Мобильная версия - попап по центру
  return (
    <>
      {/* Кнопка открытия поиска на мобилке */}
      <button 
        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 active:scale-95"
        onClick={() => setIsSearchOpen(true)}
        aria-label="Открыть поиск"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-white" />
      </button>

      {/* Попап для мобильных */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Затемненный фон */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 w-[100vw]"
            onClick={handleCloseSearch}
          />
          
          {/* Контейнер попапа */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100">
            {/* Заголовок и кнопка закрытия */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Поиск</h3>
              <button 
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={handleCloseSearch}
                aria-label="Закрыть поиск"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Форма поиска */}
            <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleEscapeKey}
                  placeholder="Что ищем?"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all duration-200"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-blue-700 active:scale-95"
              >
                Найти
              </button>
            </form>

            {/* Быстрые подсказки */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Частые запросы</h4>
              <div className="flex flex-wrap gap-2">
                {['Переводы', 'Платежи', 'История', 'Карты'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchQuery(item);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm hover:bg-gray-200 transition-colors duration-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;