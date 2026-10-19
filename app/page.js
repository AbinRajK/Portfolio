import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-20">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}