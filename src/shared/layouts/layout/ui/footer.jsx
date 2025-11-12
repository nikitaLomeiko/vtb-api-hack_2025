import React from 'react'

export const Footer = () => {
  return (
    <footer className="hidden md:block bg-(--bg-tertiary) border-t border-(--border-primary) mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Лого и копирайт */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-(--accent-primary) rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Б</span>
            </div>
            <div className="text-(--text-secondary) text-sm">
              © 2024 Банк. Лицензия ЦБ РФ № 1234
            </div>
          </div>

          {/* Ссылки */}
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
            >
              Поддержка
            </a>
            <a
              href="#"
              className="text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
            >
              Безопасность
            </a>
            <a
              href="#"
              className="text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
            >
              Тарифы
            </a>
          </div>

          {/* Контакты */}
          <div className="text-(--text-secondary) text-sm">
            📞 8-800-123-45-67
          </div>
        </div>
      </div>
    </footer>
  )
}
