import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Trusted by DeFi traders worldwide
          </h2>
          <p>
            Our social trading platform provides crowd-sourced signals that help
            LUKSO users make informed decisions and maximize their DeFi returns.
          </p>
        </div>

        <div className="grid gap-4 [--color-card:var(--color-muted)] *:border-none *:shadow-none sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
              <div className="font-bold text-lg">DeFi Power User</div>
            </CardHeader>
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  This social trading platform has completely transformed my DeFi strategy. The Universal Profile integration, real-time signal sharing, and community analytics have significantly improved my returns. Being able to follow top LUKSO traders and replicate their moves has been a game-changer. It's the perfect bridge between social networking and DeFi trading.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/shekinah.webp"
                      alt="Sarah Thompson"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="text-sm font-medium">Sarah Thompson</cite>
                    <span className="text-muted-foreground block text-sm">
                      LYXe Whale
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  The social trading features on this platform are extraordinary. Seeing real-time trades from verified Universal Profiles has helped me spot profitable LSP swaps and yield farming opportunities I would have otherwise missed. The community-driven analytics are a gold mine for active DeFi traders.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/jonathan.webp"
                      alt="Michael Chen"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Michael Chen</cite>
                    <span className="text-muted-foreground block text-sm">
                      DeFi Day Trader
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  The Universal Profile verification system gives me confidence in the signals I follow. I can track the historical performance of top LUKSO traders and automatically replicate their best moves across DeFi protocols.
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/yucel.webp"
                      alt="Jennifer Rodriguez"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">
                      Jennifer Rodriguez
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      LSP Developer
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="card variant-mixed">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  As a long-term LYXe holder, I appreciate the portfolio tracking and yield optimization features. The risk assessment tools combined with community insights have helped me build a more resilient DeFi strategy.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/rodrigo.webp"
                      alt="David Wilson"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>DW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">David Wilson</p>
                    <span className="text-muted-foreground block text-sm">
                      DeFi Educator
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}