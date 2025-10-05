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
        const records = await pb.collection("games").getFullList({ sort: "time" });
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

  const handleOpenFilters = () => setOpenFilters((prev) => !prev);

  const filteredGames = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return games.filter((game) => {
      const nameOk = game.name?.toLowerCase().includes(q);
      const tags = (() => {
        const v = game.tags ?? game.tag ?? [];
        return Array.isArray(v) ? v : v ? [v] : [];
      })();
      if (activeTags.length === 0) return nameOk;
      const hasAny = activeTags.some((t) => tags.includes(t));
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
    <div className="flex flex-col gap-28 pt-4 pb-28 md:px-20">
      <div
        data-theme="light"
        className="flex gap-4 flex-col justify-center items-end md:items-center w-full"
      >
        <div className="flex gap-2 w-full md:w-auto">
          <label className="input !bg-white !rounded-full flex items-center gap-2 px-4 py-2 w-full max-w-md md:w-xl !border !border-gray-300 active:outline-none">
            <HiOutlineSearch className="text-2xl !text-black" />
            <input
              type="search"
              required
              placeholder="Buscar atracción"
              className="flex-1 outline-none !text-gray-800 bg-transparent placeholder:!text-gray-500"
              style={{ colorScheme: "light" }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </label>

          <div className="flex items-center gap-2">
            <button
              className="bg-[#2C3480] text-white px-4 py-2 rounded-full flex items-center gap-2 justify-center hover:bg-[#232a5f]"
              onClick={handleOpenFilters}
            >
              <LiaSlidersHSolid className="text-xl" />
              Filtros
            </button>
          </div>
        </div>

        {openFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {allTags.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`relative px-2 flex-1 py-1 rounded-full border text-sm w-1/4 max-w-1/3 flex justify-center items-center ${
                    active
                      ? "!bg-[#2c3480d3] !text-white !border-[#2C3480]"
                      : "!bg-white !text-gray-800 !border-gray-300"
                  }`}
                >
                  {t}
                </button>
              );
            })}
            {allTags.length === 0 && (
              <span className="text-sm !text-gray-500">
                (No hay tags detectados en los juegos)
              </span>
            )}
          </div>
        )}
      </div>

      <ul className="space-y-24 flex flex-col items-center w-full md:flex-row md:flex-wrap md:justify-between md:gap-10">
        {
          filteredGames.length === 0 ? (
            <div className="flex flex-col gap-4">
              <img
                src="/images/noresults.png"
                alt="No results"
                className="w-40 mx-auto"
              />
              <p className="text-center text-gray-500 font-semibold">
                Lo sentimos, no se encontraron atracciones que coincidan con tu búsqueda.
              </p>
            </div>
            
          ) : filteredGames.map((game) => (
            <Game key={game.id} game={game} />
          ))
        }
      </ul>
    </div>
  );
};

export default GameList;
