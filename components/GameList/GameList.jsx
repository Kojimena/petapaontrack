"use client";

import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import Game from '../Game/Game';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
    pb.autoCancellation(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('games').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setGames(records);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-full'>
                <Loader />
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-20 pb-10'>
                <Header logo={"/images/logos/logo_v1.png"} />
                <ul className="space-y-24 flex flex-col items-center w-full md:flex-row md:flex-wrap md:justify-between md:gap-10">
                    {games.map((game) => (
                        <Game game={game} key={game.id} />
                    ))}
                </ul>
        </div>
    );
}

export default GameList;
