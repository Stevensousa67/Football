import React from 'react';
import { getNews } from '@/app/api/espn/news'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsCard } from './NewsCard';

interface NewsProps {
  tournament: string;
}

interface ESPNArticle {
  id: string;
  headline: string;
  description?: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
  links?: { web?: { href: string } };
}

export default async function News({ tournament }: NewsProps) {
  const newsData = await getNews(tournament);

  return (
    <>
      <section className="mt-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-3xl font-semibold">Latest News Articles</h1>
        {/* Grid layout when screen can fit all 3 cards */}
        <div className="hidden lg:flex flex-wrap gap-8 justify-center">
          {newsData.articles.map((article: ESPNArticle) => (
            <NewsCard key={article.id} article={article} className="w-80 border border-foreground/30" />
          ))}
        </div>

        {/* Carousel for smaller screens only */}
        <div className="w-full max-w-4xl px-4 lg:hidden">
          <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 sm:-left-2 md:-left-4 lg:-left-6" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 sm:-right-2 md:-right-4 lg:-right-6" />
            <CarouselContent className="-ml-2 md:-ml-4 pt-2">
              {newsData.articles.map((article: ESPNArticle) => (
                <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                  <NewsCard article={article} className="w-80 border border-foreground/30 mx-auto" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </section>
    </>
  );
}