"use client"
import React from 'react'
import MapaSVG from '@/components/Map/Map'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const page = () => {
      const params = useParams();
      const id = params.id;

      return (
          <div className='h-screen bg-[#2C3480] w-full'>
            <Header back logo={"/images/logos/logo_v2.png"} color={'#2C3480'}/>
            <MapaSVG id={id} />
            <Footer />
          </div>
      )
}

export default page