import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-full absolute inset-0 w-full bg-white'>
        <img src="/images/logos/logo_v1.png" alt="Petapa Ontrack Logo" className="w-28 h-auto animate-pulse" />
        <h1 className="
                text-6xl font-extrabold uppercase text-center animate-pulse
                bg-clip-text text-transparent
                bg-[linear-gradient(90deg,_#FEC907_0%,_#FEC907_25%,_#EE2C30_75%,_#D92870_100%)]
            "
            >
            petapa ontrack
        </h1>
    </div>
  )
}

export default Loader