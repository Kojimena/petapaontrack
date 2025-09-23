"use client";

import React, { useEffect } from "react";
import PocketBase from "pocketbase";
import Loader from "../Loader/Loader";
import PinComponent from "../PinComponent/PinComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";

const Map = ({id}) => {

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

   if (loading) {
        return (
            <div className='flex items-center justify-center min-h-full'>
                <Loader />
            </div>
        );
    }

  return (
    <div className='px-8 md:px-40  flex flex-col gap-4 pb-20 '>
        <div className="flex flex-col justify-center items-center gap-4 py-10 w-full">
            <TransformWrapper>
                <TransformComponent
                    wrapperClass="w-full"
                >
                    <img
                    src={`${backendUrl}/api/files/${game.collectionId}/${game.id}/${game.map_img}?token=`}
                    alt={game.name}
                    className="h-80 object-cover"
                    />
                </TransformComponent>
            </TransformWrapper>
            <div className="bg-white p-4 rounded-2xl flex flex-col w-full gap-2 md:w-2xl">
                <PinComponent image="/images/pin/yellow_pin.png" title={game.name}/>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <PinComponent image="/images/pin/pink_pin.png" title="La refa"/>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <PinComponent image="/images/pin/orange_pin.png" title="Entrada"/>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <PinComponent image="/images/pin/red_pin.png" title="Plaza dinos"/>
            </div>
        </div>
    </div>
  )
}

export default Map