import MainLayout from '../layouts/MainLayout';
import HeroSection from './HeroSection';
import FeatureCards from './FeatureCards';

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureCards />
    </MainLayout>
  );
};

export default Home;
