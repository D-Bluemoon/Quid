import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import UserIcon from "../../../public/statsoverview/User.png";
import PaperIcon from "../../../public/statsoverview/Paper.png";
import WalletIcon from "../../../public/statsoverview/Wallet.png";
import { brutalBtnPrimary, brutalBtnSecondary } from "@/lib/brutalist-classes";

export interface TokenSpend {
  key: string;
  label: string;
  amount: number;
}

export interface VerifiedTestRate {
  approvedOrPaid: number;
  total: number;
}

interface StatsOverviewProps {
  activeMissions: number;
  awaitingReview: number;
  spendByToken: TokenSpend[];
  averageReportQuality: number | null;
  verifiedTestRate: VerifiedTestRate | null;
  submissionDataComplete?: boolean;
  onCreateQuest: () => void;
}

type StatCard = {
  icon: typeof PaperIcon;
  label: string;
  value: React.ReactNode;
  detail: React.ReactNode;
  valueClassName?: string;
  bg: string;
  href?: string;
  ariaLabel: string;
};

const formatAmount = (value: number): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);

const formatPercent = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value);

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  activeMissions,
  awaitingReview,
  spendByToken,
  averageReportQuality,
  verifiedTestRate,
  submissionDataComplete = true,
  onCreateQuest,
}) => {
  const stats: StatCard[] = [
    {
      icon: PaperIcon,
      label: "Active missions",
      value: activeMissions,
      detail: "Open and started missions in your workspace.",
      bg: "bg-brutal-yellow",
      ariaLabel: `${activeMissions} active missions`,
    },
    {
      icon: UserIcon,
      label: "Awaiting review",
      value: awaitingReview,
      detail: submissionDataComplete
        ? "Pending reports across your current mission set."
        : "Some mission reports could not be loaded, so this count may be incomplete.",
      bg: "bg-brutal-cyan",
      href: "/creator/quests",
      ariaLabel: `${awaitingReview} reports awaiting review. Open the review queue.`,
    },
    {
      icon: WalletIcon,
      label: "Spend this month by token",
      value:
        spendByToken.length > 0 ? (
          <ul className="mt-1 w-full space-y-1" aria-label="Committed rewards by token">
            {spendByToken.map((token) => (
              <li
                key={token.key}
                className="flex items-baseline justify-between gap-3 text-sm font-black text-foreground"
                title={token.key.replace(/^(address|symbol):/, "")}
              >
                <span className="truncate">{token.label}</span>
                <span className="shrink-0">{formatAmount(token.amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-lg font-black text-foreground">No committed rewards</span>
        ),
      detail:
        "Estimated committed rewards from active missions created this month. Committed rewards, not payouts.",
      valueClassName: "text-xl",
      bg: "bg-brutal-lime",
      ariaLabel: "Spend this month by token, committed rewards estimate",
    },
    {
      icon: PaperIcon,
      label: "Average report quality",
      value:
        averageReportQuality === null
          ? "Not available yet"
          : formatPercent(averageReportQuality),
      detail: "No authoritative report quality score is available from the current APIs yet.",
      valueClassName: "text-lg",
      bg: "bg-brutal-yellow",
      ariaLabel: "Average report quality, not available yet",
    },
    {
      icon: UserIcon,
      label: "Verified test rate (proxy)",
      value: !submissionDataComplete
        ? "Unavailable"
        : verifiedTestRate && verifiedTestRate.total > 0
          ? formatPercent(verifiedTestRate.approvedOrPaid / verifiedTestRate.total)
          : "No reports yet",
      detail: !submissionDataComplete
        ? "Some mission reports could not be loaded, so this proxy is not shown."
        : verifiedTestRate
          ? `${verifiedTestRate.approvedOrPaid} of ${verifiedTestRate.total} submissions are APPROVED/PAID. Proxy = APPROVED/PAID submissions ÷ all submissions.`
          : "Proxy = APPROVED/PAID submissions ÷ all submissions.",
      valueClassName: "text-2xl",
      bg: "bg-brutal-cyan",
      ariaLabel: "Verified test rate proxy, APPROVED/PAID submissions over all submissions",
    },
  ];

  return (
    <section aria-label="Creator dashboard overview" className="mb-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {stats.map((stat) => {
          const card = (
            <article
              className={`flex h-full items-start gap-3 brutal-border brutal-shadow px-5 py-5 ${stat.bg}`}
            >
              <div className="brutal-border bg-background p-2.5">
                <Image src={stat.icon} alt="" width={20} height={20} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`font-black text-foreground ${stat.valueClassName ?? "text-3xl"}`}
                >
                  {stat.value}
                </div>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
              </div>
              {stat.href && (
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                />
              )}
            </article>
          );

          return stat.href ? (
            <Link
              key={stat.label}
              href={stat.href}
              aria-label={stat.ariaLabel}
              className="group block"
            >
              {card}
            </Link>
          ) : (
            <div key={stat.label} role="group" aria-label={stat.ariaLabel}>
              {card}
            </div>
          );
        })}

        <section
          aria-label="Quick actions"
          className="flex flex-col justify-between gap-4 brutal-border brutal-shadow bg-brutal-lime p-5"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Quick actions
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onCreateQuest}
              aria-label="Create a new mission"
              className={`${brutalBtnPrimary} flex w-full items-center justify-center gap-2 px-6 py-3 text-base`}
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              New mission
            </button>
            <Link
              href="/creator/quests"
              aria-label="Open the review queue"
              className={`${brutalBtnSecondary} flex w-full items-center justify-center gap-2 px-6 py-3 text-base`}
            >
              Review queue
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default StatsOverview;
