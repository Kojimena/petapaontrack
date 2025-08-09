import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import GameList from "@/components/GameList/GameList";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <section className="h-full">
      <div className="px-10 h-full">
        <GameList />
      </div>      
    </section>
  );
}
