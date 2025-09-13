import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WalkThrough from "@/components/WalkThrough/WalkThrough";

export default function Home() {
  return (
    <section className="bg-white min-h-[100vh] relative">
      <div className="px-10 ">
        <WalkThrough />
      </div>      
    </section>
  );
}
