import React from 'react';
import { getNews } from '@/app/api/espn/news'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsCard } from './NewsCard';
import type { NewsProps, ESPNArticle } from "@/lib/utils";
import ErrorDisplay from "@/components/ErrorDisplay";

export default async function News({ tournament }: NewsProps) {
  try {
    const newsData = await getNews(tournament);

    return (
      <>
        <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
          <h1 className="text-3xl font-semibold">Latest News Articles</h1>
          {/* Grid layout when screen can fit all 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 justify-center items-stretch">
            {newsData.articles.map((article: ESPNArticle) => (
              <div key={article.id} className="w-80 h-full">
                <NewsCard article={article} className="border border-foreground/20 h-full" />
              </div>
            ))}
          </div>

          {/* Carousel for smaller screens only */}
          <div className="w-full max-w-4xl lg:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="w-full relative">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 sm:-left-2 md:-left-4 lg:-left-6" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 sm:-right-2 md:-right-4 lg:-right-6" />
              <CarouselContent className="-ml-2 md:-ml-4 pt-2">
                {newsData.articles.map((article: ESPNArticle) => (
                  <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 h-full">
                    <NewsCard article={article} className="border border-foreground/20 mx-auto h-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

        </section>
      </>
    );
  } catch (error) {
    console.error(`Failed to load news for ${tournament}:`, error);
    return (
      <section className="mt-20 flex flex-col items-center text-center gap-8 px-4">
        <h1 className="text-3xl font-semibold">Latest News Articles</h1>
        <ErrorDisplay message="Failed to load news. Please try again later." />
      </section>
    );
  }
}