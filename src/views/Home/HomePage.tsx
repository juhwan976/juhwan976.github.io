import Header from "@/components/Header/Header";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { siteConfig } from "@/content/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useHomeSplash } from "@/views/Home/hooks/useHomeSplash";
import AboutSection from "@/views/Home/sections/AboutSection";
import CareerSection from "@/views/Home/sections/CareerSection";
import ContactSection from "@/views/Home/sections/ContactSection";
import HeroSection from "@/views/Home/sections/HeroSection";
import WorkSection from "@/views/Home/sections/WorkSection";

export default function HomePage(): React.ReactNode {
  useDocumentTitle(siteConfig.pageTitle + "'s Portfolio");
  const { splashVisible, splashReady, markBackdropReady, hideSplash } =
    useHomeSplash();

  return (
    <>
      <Header />
      <main id="main">
        <HeroSection onBackdropReady={markBackdropReady} />
        <AboutSection />
        <WorkSection />
        <CareerSection />
        <ContactSection />
      </main>
      {splashVisible && (
        <LoadingOverlay ready={splashReady} onDone={hideSplash} />
      )}
    </>
  );
}
