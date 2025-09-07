"use client";

import React, { useState, useEffect, useMemo } from "react";
import PocketBase from "pocketbase";
import Game from "../Game/Game";
import Loader from "../Loader/Loader";
import { HiOutlineSearch } from "react-icons/hi";
import { LiaSlidersHSolid } from "react-icons/lia";
import { IoCloseCircle } from "react-icons/io5";



const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState([]); 
  const [openFilters, setOpenFilters] = useState(false);

  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
  pb.autoCancellation(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await pb.collection("games").getFullList({
          sort: "time",
        });
        setGames(records);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allTags = useMemo(() => {
    const raw = games.flatMap((g) => {
      const v = g.tags ?? g.tag ?? [];
      return Array.isArray(v) ? v : v ? [v] : [];
    });
    return Array.from(new Set(raw)).sort();
  }, [games]);

  const toggleTag = (t) => {
    setActiveTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleOpenFilters = () => {
    setOpenFilters((prev) => !prev);
  }

  const filteredGames = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return games.filter((game) => {
      const nameOk = game.name?.toLowerCase().includes(q);

      const tags = (() => {
        const v = game.tags ?? game.tag ?? [];
        return Array.isArray(v) ? v : v ? [v] : [];
      })();

      if (activeTags.length === 0) return nameOk;

      const hasAny =
        activeTags.some((t) => tags.includes(t)); // OR
      
        return nameOk && hasAny;
        

    });
  }, [games, searchTerm, activeTags]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20 pt-4 pb-20">
      <div className="flex gap-4 flex-col justify-center items-end md:items-center w-full">

        <div className="flex gap-2">
            <label className="input bg-white rounded-full flex items-center gap-2 px-4 py-2 w-full max-w-md md:w-xl border border-gray-300 active:outline-none ">
            <HiOutlineSearch className="text-2xl text-black" />
                <input
                type="search"
                required
                placeholder="Buscar atracción"
                className="flex-1 outline-none text-gray-800"
                value={searchTerm}
                onChange={handleSearch}
            />
            </label>

            <div className="flex items-center gap-2">
            <button
                className="bg-[#2C3480] text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center"
                onClick={handleOpenFilters}
            >
                <LiaSlidersHSolid className="text-xl" />
                Filtros
            </button>
            
            </div>
        </div>

        {/* Chips de tags */}
        {openFilters && (
            <div className="flex flex-wrap gap-4 mt-2">
                {allTags.map((t) => {
                    const active = activeTags.includes(t);
                    return (
                    <button
                        key={t}
                        onClick={() => toggleTag(t)}
                        className={`px-2 flex-1 py-1 rounded-full border text-sm max-w-1/3 flex justify-center items-center ${
                        active
                            ? "bg-[#2c3480d3] text-white border-[#2C3480]"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                        {t}
                        {active && <IoCloseCircle className="ml-2" />}
                    </button>
                    );
                })}
                {allTags.length === 0 && (
                    <span className="text-sm text-gray-500">
                    (No hay tags detectados en los juegos)
                    </span>
                )}
                </div>
            )}
      </div>
      <ul className="space-y-24 flex flex-col items-center w-full md:flex-row md:flex-wrap md:justify-between md:gap-10">
        {filteredGames.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default GameList;
