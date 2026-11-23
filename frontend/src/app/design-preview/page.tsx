"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ComingSoonBadge,
  ComingSoonNavItem,
} from "@/components/ui/coming-soon";
import { EmptyState } from "@/components/ui/empty-state";
import { FormStatus } from "@/components/ui/FormStatus";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { Skeleton, SkeletonList } from "@/components/ui/skeleton";
import { brutal, brutalCardColors } from "@/lib/brutalist";
import { UPCOMING_FEATURE_LIST } from "@/lib/upcoming-features";

const buttonVariants = [
  ["default", "Default"],
  ["destructive", "Destructive"],
  ["outline", "Outline"],
  ["secondary", "Secondary"],
  ["ghost", "Ghost"],
  ["link", "Link"],
  ["brutalYellow", "Yellow"],
  ["brutalLime", "Lime"],
  ["brutalOrange", "Orange"],
] as const;

const skeletonVariants = [
  "quest",
  "submission",
  "card",
  "row",
  "table",
] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-mono text-sm font-bold uppercase tracking-widest">
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="brutal-border brutal-shadow bg-card p-5">{children}</div>
    </section>
  );
}

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen brutal-grid-bg text-foreground">
      <header className="brutal-border border-x-0 border-t-0 bg-brutal-yellow px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest">
              Quid design system
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Brutalist preview
            </h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        <Section
          title="Color blocks"
          description="Palette values are CSS variables exposed as Tailwind color tokens."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Object.entries(brutal).map(([name, token]) => (
              <div
                key={name}
                className="brutal-border brutal-shadow flex flex-col gap-2 p-3"
                style={{ backgroundColor: token }}
              >
                <span className="font-mono text-[10px] font-bold uppercase">
                  {name}
                </span>
                <span className="font-mono text-[10px]">{token}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {brutalCardColors.map((token) => (
              <span
                key={token}
                title={token}
                className="brutal-border size-8"
                style={{ backgroundColor: token }}
              />
            ))}
          </div>
        </Section>

        <Section
          title="Button variants"
          description="All variant values supported by Button, from the primary action to the brutal accent fills."
        >
          <div className="flex flex-wrap items-center gap-4">
            {buttonVariants.map(([variant, label]) => (
              <Button key={variant} variant={variant}>
                {label}
              </Button>
            ))}
          </div>
        </Section>

        <Section
          title="Button sizes and states"
          description="Small, default, large and icon sizes, plus disabled and both loading prop aliases."
        >
          <div className="flex flex-wrap items-center gap-4">
            <Button size="default">Default size</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon-only button">
              <Lock className="size-4" />
            </Button>
            <Button disabled>Disabled</Button>
            <Button loading loadingText="Saving…">
              Save changes
            </Button>
            <Button isLoading loadingText="Syncing…">
              Sync wallet
            </Button>
          </div>
        </Section>

        <Section
          title="Card parts"
          description="Card, CardHeader, CardTitle, CardDescription, CardContent and CardFooter composed together."
        >
          <Card>
            <CardHeader>
              <CardTitle className="uppercase tracking-tight">
                Mission briefing
              </CardTitle>
              <CardDescription>
                Thick border, square corners and a hard offset shadow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Submit a test report with proof, then track review on-chain.
            </CardContent>
            <CardFooter className="flex-wrap gap-3">
              <Button size="sm">Accept mission</Button>
              <Button size="sm" variant="outline">
                View details
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section
          title="Accordion"
          description="Accordion, AccordionItem, AccordionTrigger and AccordionContent, including the disabled item state."
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="accordion-one"
            className="brutal-border bg-background"
          >
            <AccordionItem value="accordion-one" className="px-4">
              <AccordionTrigger>What is Quid?</AccordionTrigger>
              <AccordionContent>
                An on-chain verified QA and UX testing platform for Stellar and
                Soroban builders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="accordion-two" className="px-4">
              <AccordionTrigger>How are rewards paid?</AccordionTrigger>
              <AccordionContent>
                Approved reports are paid from the quest escrow after review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="accordion-three" disabled className="px-4">
              <AccordionTrigger>Disabled item</AccordionTrigger>
              <AccordionContent>
                This item cannot be opened.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section
          title="EmptyState variants"
          description="Default, card, dashed and compact layouts, with action configs, ReactNode actions and the legacy message alias."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <EmptyState
              title="No submissions yet"
              description="The default variant needs no border of its own."
            />
            <EmptyState
              variant="card"
              title="No quests found"
              description="The card variant uses the brutalist border and shadow."
              icon={Sparkles}
              action={{ label: "Create quest", onClick: () => undefined }}
              secondaryAction={
                <Button variant="outline" size="sm">
                  Learn more
                </Button>
              }
            />
            <EmptyState
              variant="dashed"
              message="Nothing to review"
              description="The dashed variant also accepts the legacy message prop."
            />
            <EmptyState
              variant="compact"
              title="No results"
              icon={<Lock className="size-8" />}
              action={{ label: "Back home", href: "/" }}
            >
              <p className="text-sm text-muted-foreground">
                Children render below the action row.
              </p>
            </EmptyState>
          </div>
        </Section>

        <Section
          title="ComingSoonBadge and ComingSoonNavItem"
          description="Non-interactive placeholders for features listed in lib/upcoming-features, with and without the badge label."
        >
          <div className="space-y-4">
            {UPCOMING_FEATURE_LIST.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-wrap items-center gap-4 border-b border-foreground/20 pb-3 last:border-b-0 last:pb-0"
              >
                <ComingSoonBadge feature={feature.id} />
                <ComingSoonBadge feature={feature.id} showLabel={false} />
                <ComingSoonNavItem feature={feature.id} icon={Lock} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Skeleton and SkeletonList"
          description="The base Skeleton bar and every SkeletonList variant with a reduced item count."
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="size-10" />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {skeletonVariants.map((variant) => (
              <div key={variant}>
                <p className="mb-2 font-mono text-xs font-bold uppercase">
                  SkeletonList · {variant}
                </p>
                <SkeletonList variant={variant} count={1} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="PendingBadge"
          description="Announced status shown while an on-chain transaction waits for the indexer."
        >
          <div className="flex flex-wrap items-center gap-4">
            <PendingBadge />
            <PendingBadge className="font-mono uppercase" />
          </div>
        </Section>

        <Section
          title="FormStatus states"
          description="Idle renders nothing. Pending, success and error render announced banners; error optionally includes a retry action."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="brutal-border border-dashed p-4 text-sm text-muted-foreground">
              idle — no output
              <FormStatus status="idle" />
            </div>
            <FormStatus
              status="pending"
              pendingMessage="Signing the transaction…"
            />
            <FormStatus
              status="success"
              successMessage="Your quest is live."
            />
            <FormStatus
              status="error"
              errorMessage="The transaction was rejected."
            />
            <FormStatus
              status="error"
              errorMessage="The indexer is unavailable."
              onRetry={() => undefined}
            />
          </div>
        </Section>

        <Section
          title="Theme tokens"
          description="Spacing, shadow, radius and typography tokens exposed through @theme."
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-brutal bg-brutal-cyan p-brutal-offset font-mono text-xs font-bold uppercase">
              p-brutal-offset
            </span>
            <span className="border-2 border-foreground bg-card px-3 py-2 text-xs uppercase shadow-brutal">
              shadow-brutal
            </span>
            <span className="border-2 border-foreground bg-card px-3 py-2 text-xs uppercase shadow-brutal-lg">
              shadow-brutal-lg
            </span>
            <span className="font-sans text-2xl font-brutal uppercase tracking-brutal">
              font-brutal
            </span>
            <span className="font-mono text-brutal-label uppercase">
              text-brutal-label
            </span>
          </div>
        </Section>

        <section className="brutal-border brutal-shadow-lg bg-card p-6">
          <h2 className="mb-2 text-2xl font-black uppercase">Typography</h2>
          <p className="max-w-2xl text-muted-foreground">
            Space Grotesk for headings and UI. Geist Mono for labels. No soft
            gradients — thick borders, offset shadows, and loud accent blocks.
          </p>
        </section>
      </main>
    </div>
  );
}
