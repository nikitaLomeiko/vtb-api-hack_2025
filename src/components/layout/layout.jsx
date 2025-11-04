import React from 'react';
import Header from './ui/header';
import Footer from './ui/footer';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className={`
        flex-1 pb-0
        md:pb-0
        mobile:pb-20
      `}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
