import AnimatedSection from "@/components/AnimatedSection";
import Contact from "@/components/sections/contact/Contact";
import Games from "@/components/sections/games/Games";
import News from "@/components/sections/news/News";
import Standings from "@/components/sections/standings/Standings";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { TOURNAMENTS } from "@/lib/utils";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const tournament: string = session?.user?.preferredLeague ?? TOURNAMENTS[Math.floor(Math.random() * TOURNAMENTS.length)];

  return (
    <>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <div className="mt-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Football App</h1>
          <p className="text-lg text-gray-700 text-center">Your one-stop destination for football stats and updates.</p>
        </div>
        <Standings tournament={tournament} season="2025" />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <Games tournament={tournament} />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <News tournament={tournament} />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <Contact />
      </AnimatedSection>
    </>
  );
}
