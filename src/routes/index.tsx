import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { connectionCards, type ConnectionCard } from "@/lib/cards";
import heroImage from "@/assets/cowboy-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cowboys don't Cry — Connection Cards" },
      {
        name: "description",
        content:
          "A random connection card each time you visit — honest questions for men about emotions, courage and connection.",
      },
      { property: "og:title", content: "Cowboys don't Cry — Connection Cards" },
      {
        property: "og:description",
        content:
          "A random connection card each time you visit — honest questions for men about emotions, courage and connection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function pickRandom(exclude?: number): ConnectionCard {
  const pool = exclude
    ? connectionCards.filter((c) => c.number !== exclude)
    : connectionCards;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

function Index() {
  const [card, setCard] = useState<ConnectionCard | null>(null);

  useEffect(() => {
    setCard(pickRandom());
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <header className="relative overflow-hidden border-b-2 border-primary/40">
        <img
          src={heroImage}
          alt="Lone cowboy on horseback watching the sun set over desert mesas"
          width={1920}
          height={912}
          className="h-[42vh] min-h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-4xl leading-tight text-primary drop-shadow-[0_3px_0_oklch(0.19_0.03_50)] sm:text-6xl md:text-7xl">
            Cowboys don't Cry
          </h1>
          <div className="rope-divider mt-5 w-40 sm:w-64" />
          <p className="mt-4 text-sm uppercase tracking-[0.4em] text-foreground/90 sm:text-base">
            Connection Cards
          </p>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-14">
        <div className="grain-overlay w-full rounded-md border-4 border-double border-secondary bg-card p-8 text-card-foreground shadow-[0_18px_40px_-18px_oklch(0_0_0_/_0.7)] sm:p-12">
          {card ? (
            <>
              <span className="font-display text-xs tracking-widest text-accent">
                Card No. {card.number}
              </span>
              <h2 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">
                {card.title}
              </h2>
              <div className="rope-divider my-6 w-full opacity-70" />
              <p className="text-lg leading-relaxed sm:text-xl">{card.prompt}</p>
            </>
          ) : (
            <p className="py-10 text-center font-display text-lg text-accent">
              Dealing your card…
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCard((c) => pickRandom(c?.number))}
          className="mt-8 rounded-sm border-2 border-primary bg-transparent px-7 py-3 font-display text-sm tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Draw another card
        </button>

        <p className="mt-12 text-center font-display text-lg text-primary sm:text-xl">
          You don't have to walk this road alone
        </p>
      </section>

      <footer className="border-t border-border/60 px-6 py-8 text-center text-sm text-muted-foreground">
        Find our website at{" "}
        <a
          href="https://www.anchorandember.co.za"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          www.anchorandember.co.za
        </a>
      </footer>
    </main>
  );
}
