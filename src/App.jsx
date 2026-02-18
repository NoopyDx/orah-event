import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Lineup from "./components/sections/Lineup";
import Infos from "./components/sections/Infos";
import Footer from "./components/layout/Footer";
import GrainOverlay from "./components/decorative/GrainOverlay";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Lineup />
        <Infos />
      </main>
      <Footer />
    </>
  );
}
