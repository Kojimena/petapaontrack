"use client";

import React, { useEffect } from "react";
import PocketBase from "pocketbase";
import { GoClock } from "react-icons/go";
import { GiBodyHeight } from "react-icons/gi";
import { PiShieldWarning } from "react-icons/pi";
import Loader from "../Loader/Loader";
import { useRouter } from 'next/navigation';

const GameCard = ({id}) => {

    const router = useRouter();

    const backendUrl = process.env.NEXT_PUBLIC_PB_URL;
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);

    const [game, setGame] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [err, setErr] = React.useState("");


    useEffect(() => {
    const fetchGame = async () => {
      try {
        const record = await pb.collection("games").getOne(id);
        setGame(record);
      } catch (e) {
        console.error(e);
        setErr("No se pudo cargar el juego.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGame();
  }, [id]);


    const handleGameTime = (time) => {
    let newtime = "";
    let unit = "";
    if (time < 1) {
      newtime = "< 1";
      unit = "min";
      return (
        <span className="text-black">
          <span className="text-xl font-bold">{newtime}</span>
          <span className="text-sm">{unit}</span>
        </span>
      );
    } else if (time > 60) {
      let hour = time / 60;
      let min = (hour - Math.floor(hour)) * 60;
      newtime = Math.floor(hour);
      unit = "h";
      if (min > 0) {
        return (
          <span className="text-black">
            <span className="text-xl ">{newtime}</span>
            <span className="text-sm">{unit} </span>
            <span className="text-xl ">{Math.floor(min)}</span>
            <span className="text-sm">min</span>
          </span>
        );
      } else {
        return (
          <span className="text-black">
            <span className="text-xl">{newtime}</span>
            <span className="text-sm">{unit}</span>
          </span>
        );
      }
    } else {
      newtime = time;
      unit = "min";
      return (
        <div className="text-black">
          <span className="text-xl ">{Math.round(newtime)}</span>
          <span className="text-sm">{unit}</span>
        </div>
      );
    }
  };


   if (loading) {
        return (
            <div className='flex items-center justify-center min-h-full'>
                <Loader />
            </div>
        );
    }

  return (
    <div 
      className='px-8 md:px-40 lg:px-60 w-full flex flex-col justify-center items-center gap-4 min-h-full pb-28 '
      >
        <h2 className='font-bold text-4xl text-center text-white'>
            {game.name}
        </h2>
        <div className='bg-white w-full md:max-w-2xl p-4 rounded-4xl flex flex-col items-center justify-center gap-4'
          data-theme="light"
        >
            <img src={`${backendUrl}/api/files/${game.collectionId}/${game.id}/${game.image}?token=`}
                    alt={game.name} className='w-full h-40 object-contain rounded-2xl'
            />
            <span className='px-4 text-justify font-light text-black' 
              style={{ colorScheme: "light" }}
            dangerouslySetInnerHTML={{ __html: game.description }}></span>
                <div className='flex flex-col px-4 '>
                <div className='w-full h-[1px] bg-[#858586]'></div>
                {
                  !game.closed ? (
                    <div className='flex gap-4 justify-between py-4 items-center'>
                    <div className='flex gap-2 items-center'>
                        <GoClock className='text-[#858586] text-2xl' />
                        <span className='font-medium text-[#858586] text-sm'>Espera aproximada</span>
                    </div>
                    <span className='font-medium text-black'>{handleGameTime(game.time)}</span>
                </div>
                  ) : (
                    <div className='flex gap-4 justify-between py-4 items-center w-full'>
                      <div className='flex gap-2 items-center w-full justify-center'>
                          <span className='font-medium text-red-400 text-sm text-center'>Atracción cerrada temporalmente</span>
                      </div>
                  </div>
                  )
                }
                <div className='w-full h-[1px] bg-[#858586]'></div>
                <div className='flex flex-col gap-4 justify-between py-4 items-start'>
                    <div className='flex gap-2 items-center'>
                        <GiBodyHeight className='text-[#858586] text-2xl' />
                        <span className='font-medium text-[#858586]'>Altura</span>
                    </div>
                    <span className='font-medium text-black'>
                        <div className="px-4 flex flex-col gap-2 text-sm">
                            {Array.isArray(game.rules_height) ? (
                                game.rules_height.map((rango, idx) => (
                                    <div key={idx} className="flex justify-between gap-4">
                                        <span className="text-black font-medium w-20">
                                            {rango.min}m {rango.max == "999" ? "+" : `- ${rango.max}m`}
                                        </span>
                                        <span className="text-black w-40 font-light">{rango.condicion}</span>
                                </div>
                            ))
                            ) : (
                            <span className="font-medium text-black">{heightReq}</span>
                            )}
                        </div>
                    </span>
                </div>

                    <div className='w-full h-[1px] bg-[#858586]'></div>
                <div className=' flex flex-col gap-4 justify-between py-4 items-start'>
                    <div className='flex gap-2 items-center'>
                        <PiShieldWarning className='text-[#858586] text-2xl' />
                        <span className='font-medium text-[#858586]'>Restricciones</span>
                    </div>
                    <span className='px-4 restrictions text-sm ' dangerouslySetInnerHTML={{ __html: game.restrictions }}></span>
                </div>
                
            <button className=' text-white mx-10 my-4 px-4 py-2 rounded-xl font-medium' style={{backgroundColor: `#${game.out_color}`}} onClick={() => {
                router.push(`/map/${game.id}`);
            }}>
                Ver en mapa
            </button>

            </div>
        </div>
    </div>
  )
}

export default GameCard