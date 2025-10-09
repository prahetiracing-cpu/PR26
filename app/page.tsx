import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import PR26Section from "./sections/PR26Section";
import SponsorsSection from "./sections/SponsorsSection";
import TeamStatsSection from "./sections/TeamStats";
import EventsSection from "./sections/EventsSection";

export default function Home() {
  return (
    <div className="relative">

      
      <main className="overflow-x-hidden">
        <HomeSection />
        <EventsSection />
        <AboutSection />
        <TeamStatsSection />
        <PR26Section />
        <SponsorsSection />
      </main>
    </div>
  );
}
