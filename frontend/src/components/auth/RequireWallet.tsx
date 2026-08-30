"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletProvider";
import { ONBOARDING_ROUTES } from "@/lib/onboarding";

export default function RequireWallet({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected) {
      router.replace(ONBOARDING_ROUTES.signUp);
    }
  }, [connected, router]);

  if (!connected) {
    return (
      <div className="flex h-screen items-center justify-center brutal-grid-bg bg-background text-foreground">
        <div className="brutal-border brutal-shadow bg-card p-8 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin border-[3px] border-foreground border-t-brutal-pink" />
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Checking wallet connection…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
