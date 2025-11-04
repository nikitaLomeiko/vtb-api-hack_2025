import React from 'react';
import Header from './ui/header';
import Footer from './ui/footer'; // Или CompactFooter

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Основной контент с отступами */}
      <main className={`
        flex-1 pb-0
        md:pb-0          // На десктопе нет нижней навигации
        mobile:pb-20     // На мобилке отступ для тулбара
      `}>
        {children}
      </main>
      
      {/* Футер показывается только на десктопе */}
      <Footer />
    </div>
  );
};
