import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { BrandStory } from "@/components/home/BrandStory";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterBlock } from "@/components/home/NewsletterBlock";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />

      <CategoryTiles />

      <NewArrivals />

      <BrandStory />

      <InstagramFeed />

      <NewsletterBlock />
    </>
  );
}