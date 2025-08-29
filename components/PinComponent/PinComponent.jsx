import React from 'react'

const PinComponent = ({image, title}) => {
  return (
    <div className='flex w-full justify-start items-center'>
        <img src={image} alt={title} className='w-8 h-8' />
        <span className='ml-2 text-black'>{title}</span>
    </div>
  )
}

export default PinComponent