import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import PR26Section from "./sections/PR26Section";
import SponsorsSection from "./sections/SponsorsSection";
import TeamStatsSection from "./sections/TeamStats";
import EventsSection from "./sections/EventsSection";
import FooterSection from "./sections/FooterSection";

export default function Home() {
  return (
    <div className="relative">

      
      <main className="overflow-x-hidden">
        <HomeSection />
        <EventsSection />
        <PR26Section />
        <AboutSection />
        <TeamStatsSection />
        <SponsorsSection />
        <FooterSection/>
      </main>
    </div>
  );
}
