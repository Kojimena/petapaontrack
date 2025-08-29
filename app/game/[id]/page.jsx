"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import GameCard from '@/components/GameCard/GameCard'
import { useSearchParams } from 'next/navigation';

const GamePage = () => {
  const params = useParams();
  const id = params.id;
  const outerColor = useSearchParams().get('outer') || 'ffffff'; // Default to white if no color is provided


  return (
    <div className={`flex flex-col min-h-[100vh] justify-start items-center`} style={{ backgroundColor: `#${outerColor}` }}>
      <Header back logo={"/images/logos/logo_v1.png"} color={`#${outerColor}`}/>
      <GameCard id={id}/>
      <Footer />
    </div>
  )
}

export default GamePage