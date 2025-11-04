import React from 'react';

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Лого и копирайт */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Б</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 Банк. Лицензия ЦБ РФ № 1234
            </div>
          </div>

          {/* Ссылки */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              Поддержка
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              Безопасность
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              Тарифы
            </a>
          </div>

          {/* Контакты */}
          <div className="text-gray-500 text-sm">
            📞 8-800-123-45-67
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;