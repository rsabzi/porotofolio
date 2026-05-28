import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Metrics from './sections/Metrics';
import Lab from './sections/Lab';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* Ambient effects */}
      <div className="noise-overlay" />
      <div className="scan-line" />

      <Navigation />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Metrics />
        <Lab />
        <Contact />
      </main>
    </>
  );
}
