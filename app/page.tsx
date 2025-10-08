import Image from "next/image";
import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import PR26Section from "./sections/PR26Section";
import SponsorsSection from "./sections/SponsorsSection";
import TeamStatsSection from "./sections/TeamStats";
import EventsSection from "./sections/EventsSection";

export default function Home() {
  return (
    <div>
      <main>
        <HomeSection/>
        <AboutSection/>
        <TeamStatsSection/>
        <PR26Section/>
        <EventsSection/>
        <SponsorsSection/>
      </main>
      
    </div>
  );
}
