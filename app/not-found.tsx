"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <motion.p className="text-3xl font-semibold mt-20 mb-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                404 - Houston, We Have a Problem!
            </motion.p>
            <div className="w-70 mx-auto aspect-[16/9] mb-4">
                <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}>
                    <Image src="/Astronaut.jpg" alt="Astronaut floating in space" className="object-cover rounded-lg w-full h-full" width={1920} height={1080} sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw" priority />
                </motion.div>
            </div>
            <motion.p className="text-lg text-muted-foreground text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
                You&apos;ve drifted into deep space! Let&apos;s get you back to Earth.
            </motion.p>
            <div className="text-center mb-1">
                <Button asChild className="hover:underline">
                    <Link href="/">Return to Earth</Link>
                </Button>
            </div>
        </div>
    );
}