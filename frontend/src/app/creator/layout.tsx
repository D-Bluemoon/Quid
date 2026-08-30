"use client";

import Sidebar from "@/components/creator/Sidebar";
import TopNav from "@/components/creator/TopNav";
import RequireWallet from "@/components/auth/RequireWallet";
import RequireRole from "@/components/auth/RequireRole";
import { brutalDashboard } from "@/lib/brutalist-classes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireWallet>
      <RequireRole role="creator">
        <div className={`${brutalDashboard} overflow-x-hidden`}>
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopNav />
            <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </RequireRole>
    </RequireWallet>
  );
}
