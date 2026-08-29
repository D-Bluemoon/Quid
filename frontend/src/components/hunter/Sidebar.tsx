"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidWallet } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";
import { RiFileList3Line } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuClipboardCheck } from "react-icons/lu";

const navItems = [
  { href: "/hunter", label: "Dashboard", icon: TbLayoutDashboard },
  { href: "/hunter/mission-board", label: "Mission Board", icon: RiFileList3Line },
  { href: "/hunter/my-submissions", label: "My Submissions", icon: LuClipboardCheck },
  { href: "/hunter/wallet", label: "Wallet", icon: BiSolidWallet },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (href: string) => {
    const isActive =
      pathname === href || (href !== "/hunter" && pathname.startsWith(href));
    return `flex items-center gap-2 border-l-[4px] py-2 pl-3 font-bold uppercase tracking-wide text-xs transition-colors ${
      isActive
        ? "border-brutal-pink bg-brutal-yellow/30 text-foreground"
        : "border-transparent text-muted-foreground hover:border-brutal-cyan hover:text-foreground"
    }`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed right-4 top-4 z-50 flex min-h-11 min-w-11 items-center justify-center brutal-border brutal-shadow bg-brutal-lime p-2 md:hidden"
        aria-label={isOpen ? "Close hunter navigation" : "Open hunter navigation"}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-foreground/40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close hunter navigation overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r-[3px] border-foreground bg-card p-4 transition-transform duration-300 md:relative md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between border-b-[3px] border-foreground pb-4">
          <Image src="/logo.png" alt="Quid" width={55} height={32} />
          <span className="text-xs font-black uppercase tracking-wide">Hunters</span>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={linkClasses(item.href)}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto brutal-border brutal-shadow bg-brutal-orange p-4 text-sm">
          <p className="font-black uppercase tracking-wide">Hunter mode</p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Complete missions and track every XLM reward.
          </p>
        </div>
      </aside>
    </>
  );
}
