import { useSiteContent } from './hooks/useSiteContent';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Lineup from './components/sections/Lineup';
import Infos from './components/sections/Infos';
import Footer from './components/layout/Footer';
import GrainOverlay from './components/decorative/GrainOverlay';

export default function Site() {
  const { content, sections } = useSiteContent();

  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        {sections.hero !== false && <Hero content={content} />}
        {sections.about !== false && <About content={content} />}
        {sections.lineup !== false && <Lineup content={content} />}
        {sections.infos !== false && <Infos content={content} />}
      </main>
      {sections.footer !== false && <Footer content={content} />}
    </>
  );
}
