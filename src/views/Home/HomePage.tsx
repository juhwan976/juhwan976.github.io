import ContactSection from '@/views/Home/sections/ContactSection';
import HeroSection from '@/views/Home/sections/HeroSection';
import PrinciplesSection from '@/views/Home/sections/PrinciplesSection';
import ScrollStorySection from '@/views/Home/sections/ScrollStorySection';
import WorkSection from '@/views/Home/sections/WorkSection';

export default function HomePage(): React.ReactNode {
  return (
    <main id="main">
      <HeroSection />
      <ScrollStorySection />
      <WorkSection />
      <PrinciplesSection />
      <ContactSection />
    </main>
  );
}
