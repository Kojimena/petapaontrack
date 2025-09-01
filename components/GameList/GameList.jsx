"use client";

import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import Game from '../Game/Game';
import Loader from '../Loader/Loader';
import { HiOutlineSearch } from "react-icons/hi";
import { LiaSlidersHSolid } from "react-icons/lia";




const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
    pb.autoCancellation(false)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('games').getFullList({
                    sort: 'time',
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
        <div className='flex flex-col gap-20 pt-4 pb-20'>
            <div className='flex gap-4 flex-col justify-center items-end md:items-start'>
                <label className="input bg-white rounded-full flex items-center gap-2 px-4 py-2 w-full max-w-md border border-gray-300 active:outline-none ">
                    <HiOutlineSearch className='text-2xl text-black' />
                    <input type="search" required placeholder="Buscar atracción" className='flex-1 outline-none text-gray-800' value={searchTerm} onChange={handleSearch}/>
                </label>
                <button className='bg-[#2C3480] text-white w-36 px-4 py-2 rounded-full  flex items-center gap-2 justify-center'>
                    <LiaSlidersHSolid className='text-xl' />
                    Filtros
                </button>
            </div>
                <ul className="space-y-24 flex flex-col items-center w-full md:flex-row md:flex-wrap md:justify-between md:gap-10">
                    {games
                    .filter((game) =>
                        game.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((game) => (
                        <Game key={game.id} game={game} />
                    ))}
                </ul>
        </div>
    );
}

export default GameList;
