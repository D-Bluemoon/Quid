"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuidLogo from "@/components/brand/QuidLogo";
import { useWallet } from "@/context/WalletProvider";
import { brutalBtnPrimary } from "@/lib/brutalist-classes";
import {
  getDashboardRouteForRole,
  saveUserRole,
  type UserRole,
} from "@/lib/onboarding";
import { persistUserRole } from "@/lib/user-api";

const ROLES: Array<{
  id: UserRole;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  accent: "cyan" | "lime";
}> = [
  {
    id: "creator",
    icon: "/role-selection/building-icon.png",
    title: "Create surveys & get insights",
    description:
      "Launch research projects and collect quality responses from engaged participants",
    benefits: [
      "Access to verified Stellar participants",
      "Advanced analytics and reporting",
      "Real-time response monitoring",
      "On-chain escrow for rewards",
    ],
    accent: "cyan",
  },
  {
    id: "hunter",
    icon: "/role-selection/cash-icon.png",
    title: "Take surveys & earn money",
    description:
      "Share your opinions with brands and get rewarded for your valuable feedback",
    benefits: [
      "Earn USDC for each completed mission",
      "Flexible schedule — work anytime",
      "Fair compensation for your time",
      "Instant payments via blockchain",
    ],
    accent: "lime",
  },
];

const selectedBg: Record<"cyan" | "lime", string> = {
  cyan: "bg-brutal-cyan",
  lime: "bg-brutal-lime",
};

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey } = useWallet();
  const router = useRouter();

  const handleContinue = async () => {
    if (!selectedRole || saving) return;

    if (!publicKey) {
      saveUserRole(selectedRole);
      router.push(getDashboardRouteForRole(selectedRole));
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await persistUserRole(publicKey, selectedRole);
      router.push(getDashboardRouteForRole(selectedRole));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save your account type. Please try again.",
      );
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen brutal-grid-bg text-foreground px-4 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
        <QuidLogo width={140} height={44} />

        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Account type selection
          </h1>
          <p className="mt-3 max-w-xl text-sm font-medium text-muted-foreground sm:text-base">
            Choose how you want to use Quid and continue into a dashboard that
            feels like the same product.
          </p>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex w-full cursor-pointer flex-col text-left brutal-border brutal-shadow transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#0a0a0a] ${
                  isSelected
                    ? `${selectedBg[role.accent]}`
                    : "bg-card hover:bg-background"
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  <div className="brutal-border flex shrink-0 items-center justify-center bg-background p-2.5">
                    <Image
                      src={role.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10"
                    />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-black uppercase leading-tight tracking-tight sm:text-xl">
                        {role.title}
                      </h2>
                      {isSelected && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-bold uppercase">
                          <Check className="h-4 w-4" />
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>

                <div className="border-t-[3px] border-foreground bg-background/60 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-foreground">
                    Key benefits
                  </p>
                  <ul className="mt-3 space-y-2 text-sm font-medium text-muted-foreground">
                    {role.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2 leading-relaxed">
                        <span className="font-black text-foreground">→</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex w-full max-w-sm flex-col items-center gap-3">
          {error && (
            <p
              role="alert"
              className="brutal-border w-full bg-brutal-pink px-3 py-2 text-center text-sm font-bold text-foreground"
            >
              {error}
            </p>
          )}
          <button
            type="button"
            className={`${brutalBtnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={selectedRole === null || saving}
            onClick={() => void handleContinue()}
          >
            {saving ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
