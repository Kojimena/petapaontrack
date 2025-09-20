import React from 'react'
import FaqsComponent from '@/components/FaqsComponent/FaqsComponent'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const FaqsPage = () => {
  return (
    <div className='bg-white min-h-[100vh] relative'>
      <Header logo={"/images/logos/logo_v1.png"} back />
      <div className='px-10 '>
        <h1 className="text-2xl font-bold mb-4 text-center text-[#2C3480]">Preguntas Frecuentes</h1>
        <FaqsComponent />
      </div>
      <Footer />
    </div>
  )
}

export default FaqsPage