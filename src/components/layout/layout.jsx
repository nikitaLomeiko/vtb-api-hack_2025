import React from 'react'
import Header from './ui/header'
import Footer from './ui/footer'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white-50 flex flex-col">
      <Header />

      <main className={`flex-1 pb-[110px] md:pb-0`}>{children}</main>

      <Footer />
    </div>
  )
}
