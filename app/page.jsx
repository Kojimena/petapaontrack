import GameList from "@/components/GameList/GameList";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <section className="bg-white min-h-[100dvh]">
      <div className="px-10">
        <Header logo={"/images/logos/logo_v1.png"} />
        <GameList />
      </div>      
    </section>
  );
}
