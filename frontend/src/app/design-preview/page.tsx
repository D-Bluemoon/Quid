"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { brutal, brutalCardColors } from "@/lib/brutalist";

export default function DesignPreviewPage() {
  return (
    <div className="min-h-screen brutal-grid-bg">
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
        <section>
          <h2 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest">
            Color blocks
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {Object.entries(brutal).map(([name, hex]) => (
              <div
                key={name}
                className="brutal-border brutal-shadow flex flex-col gap-2 p-3"
                style={{ backgroundColor: hex }}
              >
                <span className="font-mono text-[10px] font-bold uppercase">
                  {name}
                </span>
                <span className="font-mono text-xs">{hex}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Cyan</Button>
            <Button variant="brutalYellow">Yellow</Button>
            <Button variant="brutalLime">Lime</Button>
            <Button variant="brutalOrange">Orange</Button>
            <Button variant="destructive">Pink</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest">
            Cards
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {brutalCardColors.map((color, i) => (
              <Card key={color} className="overflow-hidden">
                <div className="h-3" style={{ backgroundColor: color }} />
                <CardHeader>
                  <CardTitle className="uppercase tracking-tight">
                    Mission #{i + 1}
                  </CardTitle>
                  <CardDescription>
                    Flat color header + hard shadow card body.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="brutal-border brutal-shadow bg-card p-6">
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
