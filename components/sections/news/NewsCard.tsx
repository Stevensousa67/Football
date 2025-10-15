import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: string;
  headline: string;
  description?: string;
  images?: { url: string; alt?: string; width?: number; height?: number }[];
  links?: { web?: { href: string } };
}

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

export function NewsCard({ article, className }: NewsCardProps) {
  const img = article.images?.[0];
  const href = article.links?.web?.href || "#";

  return (
    <Card className={`flex h-full p-0 hover:bg-blue-100 ${className || ""}`}>
      <CardContent className="flex flex-col flex-1 p-0">
        {img && (
          <div className="relative w-full aspect-video overflow-hidden rounded-xl">
            <Image src={img.url} alt={img.alt || article.headline} fill className="object-cover" sizes="320px" />
          </div>
        )}
        <div className="flex flex-col flex-1 p-2 gap-4 mb-4">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 mt-2">{article.headline}</h3>
          {article.description && (
            <p className="text-sm text-muted-foreground line-clamp-4">{article.description}</p>
          )}
          <div className="mt-auto">
            <Button asChild size="sm" className="text-sm font-medium">
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Read article: ${article.headline}`}>
                Read Article
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}