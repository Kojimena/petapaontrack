import GameList from "@/components/GameList/GameList";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Games() {
  return (
    <section className="bg-white min-h-[100vh] relative">
      <div className="px-10 ">
        <Header logo={"/images/logos/logo_v1.png"} />
        <GameList />
        <Footer />
      </div>      
    </section>
  );
}
