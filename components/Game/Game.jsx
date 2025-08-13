import React from 'react'
import Link from 'next/link';

const Game = ({ game}) => {
    const backendUrl = process.env.NEXT_PUBLIC_PB_URL;
  return (
    <li
    className="p-4 rounded-xl relative shadow-sm h-24 md:h32 w-full md:min-w-[30%] md:flex-1 md:max-w-[33%] cursor-pointer"
    style={{
        background: `radial-gradient(circle, #${game.inner_color}, #${game.out_color})`,
    }}>
        <Link
        href={{
          pathname: `/game/${game.id}`,
          query: {
            outer: game.out_color
          }
        }}
      >
        <img
            src={`${backendUrl}/api/files/${game.collectionId}/${game.id}/${game.image}?token=`}
            alt={game.name}
            className="w-full max-w-[80%] h-26 absolute left-1/2 -translate-x-1/2 -top-16 object-contain rounded-lg"
        />
        <div className="flex justify-between absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white w-46 leading-[1]">{game.name}</h2>
            <div className='flex items-end gap-2'>
                <span className="text-white"> <span className='text-2xl font-bold'>{game.time}</span> <span className='text-sm'>min</span></span>
            </div>
        </div>
        </Link>
    </li>
  )
}

export default Game