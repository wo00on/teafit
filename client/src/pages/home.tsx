import { Header } from '../components/header';
import { HeroSection } from '../components/hero-section';
import { FloatingTeaCarousel } from '../components/floating-tea-carousel';
import { DiagnosisSection } from '../components/diagnosis-section';
import { TodayRecommendation } from '../components/today-recommendation';
import { TeaCatalog } from '../components/tea-catalog';
import { TeaDiary } from '../components/tea-diary';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <HeroSection />
      <FloatingTeaCarousel />
      <DiagnosisSection />
      <TodayRecommendation />
      <TeaCatalog />
      <TeaDiary />
      <Footer />
    </div>
  );
}
