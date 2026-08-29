import React from "react";
import Image from "next/image";
import UserIcon from "../../../public/statsoverview/User.png";
import PaperIcon from "../../../public/statsoverview/Paper.png";
import WalletIcon from "../../../public/statsoverview/Wallet.png";
import { brutalBtnPrimary } from "@/lib/brutalist-classes";

interface StatsOverviewProps {
  activeQuests: number;
  totalResponses: number;
  totalRewards: number;
  onCreateQuest?: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  activeQuests,
  totalResponses,
  totalRewards,
  onCreateQuest,
}) => {
  const stats = [
    {
      icon: PaperIcon,
      label: "Active Quests",
      value: activeQuests,
      bg: "bg-brutal-yellow",
    },
    {
      icon: UserIcon,
      label: "Total response",
      value: totalResponses,
      bg: "bg-brutal-cyan",
    },
    {
      icon: WalletIcon,
      label: "Total rewards",
      value: `${totalRewards.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} USD`,
      bg: "bg-brutal-lime",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-3 brutal-border brutal-shadow px-5 py-5 ${stat.bg}`}
          >
            <div className="brutal-border bg-background p-2.5">
              <Image
                src={stat.icon}
                alt={stat.label}
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-3xl font-black text-foreground">
                {typeof stat.value === "number"
                  ? stat.value
                  : stat.value.split(" ")[0]}
              </p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end lg:col-span-1">
        <button
          type="button"
          onClick={onCreateQuest}
          className={`${brutalBtnPrimary} flex w-full items-center justify-center px-6 py-3 text-base sm:w-auto`}
        >
          Create a New Survey
        </button>
      </div>
    </div>
  );
};
