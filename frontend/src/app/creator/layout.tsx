"use client";

import { useWallet } from "@/context/WalletProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/creator/Sidebar";
import TopNav from "@/components/creator/TopNav";
import RequireRole from "@/components/auth/RequireRole";
import { brutalDashboard } from "@/lib/brutalist-classes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (connected && publicKey) {
        setChecked(true);
      } else {
        router.replace("/connect-wallet");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [connected, publicKey, router]);

  if (!checked) {
    return (
      <div className={`${brutalDashboard} items-center justify-center`}>
        <div className="brutal-border brutal-shadow bg-card p-8 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin border-[3px] border-foreground border-t-brutal-pink" />
          <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Checking wallet connection…
          </p>
        </div>
      </div>
    );
  }

  if (!connected || !publicKey) {
    return null;
  }

  return (
    <RequireRole role="creator">
      <div className={`${brutalDashboard} overflow-x-hidden`}>
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </RequireRole>
  );
}
