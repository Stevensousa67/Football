import AnimatedSection from "@/components/AnimatedSection";
import Contact from "@/components/sections/contact/Contact";
import Standings from "@/components/sections/standings/Standings";

export default function Home() {
  return (
    <>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <div className="mt-40 ml-2 mr-2 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Football App</h1>
          <p className="text-lg text-gray-700">Your one-stop destination for football stats and updates.</p>
        </div>
        <Standings tournament="bra.1" season="2025" />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-up" duration="duration-700">
        <Contact />
      </AnimatedSection>
    </>
  );
}
