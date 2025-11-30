"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { NewsCardProps } from "@/lib/utils";

export function NewsCard({ article, className }: NewsCardProps) {
  const img = article.images?.[0];
  const href = article.links?.web?.href || "#";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card 
        className={`flex h-full p-0 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${className || ""}`}
      >
        <CardContent className="flex flex-col flex-1 p-0">
          {img && (
            <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
              <Image 
                src={img.url} 
                alt={img.alt || article.headline} 
                fill 
                className="object-cover transition-transform duration-300 hover:scale-105" 
                sizes="320px" 
              />
            </div>
          )}
          <div className="flex flex-col flex-1 p-4 gap-3">
            <h3 className="font-semibold text-base leading-snug line-clamp-2">{article.headline}</h3>
            {article.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{article.description}</p>
            )}
            <div className="mt-auto pt-2">
              <Button asChild size="sm" className="text-sm font-medium w-full">
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Read article: ${article.headline}`}>
                  Read Article
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}