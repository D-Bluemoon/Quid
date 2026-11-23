"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { StatsOverview } from "@/features/creators/StatsOverview";
import type { TokenSpend, VerifiedTestRate } from "@/features/creators/StatsOverview";
import { CreatorQuestCard } from "@/features/creators/CreatorQuestCard";
import { ResponsePreview } from "@/features/creators/ResponsePreview";
import { DashboardSkeleton } from "@/features/creators/SkeletonLoaders";
import {
  FirstTimeEmptyState,
  NoQuestsEmptyState,
  NoResponsesEmptyState,
} from "@/features/creators/DashboardEmptyState";
import { EmptyState } from "@/components/ui/empty-state";
import { useWallet } from "@/context/WalletProvider";
import { creatorApiFetch } from "@/lib/creator-api";

/**
 * Issue #325: creator dashboard, wired to `GET /missions/me` instead of
 * `MockData.ts`. There is no dedicated "recent activity across all my
 * missions" endpoint, so the response preview is derived client-side: the
 * few most recently updated missions that have at least one submission are
 * each queried for their submissions (`GET /missions/:id/submissions`,
 * owner-gated), merged, and the newest few are shown. Documented as a
 * judgment call in the PR description.
 */

type MissionStatus = "OPEN" | "STARTED" | "PAUSED" | "COMPLETED" | "CANCELLED";
type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED" | "PAID";

interface MissionResponse {
  id: string;
  title: string;
  status: MissionStatus;
  metadata: unknown;
  rewardToken: string;
  rewardAmount: string;
  maxParticipants: number;
  createdAt: string;
  updatedAt: string;
  _count?: { submissions?: number };
}

interface SubmissionResponse {
  id: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  hunter?: { address: string; displayName: string | null };
}

interface DashboardQuest {
  id: string;
  title: string;
  category: string;
  budget: string;
  dueDate: string;
  submissionCount: { current: number; total: number };
  status: MissionStatus;
  rewardToken: string;
  rewardAmount: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardResponsePreview {
  id: string;
  missionId: string;
  respondentName: string;
  questTitle: string;
  timeSinceSubmission: string;
  status: SubmissionStatus;
  rewardToken: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  activeMissions: number;
  awaitingReview: number;
  spendByToken: TokenSpend[];
  averageReportQuality: number | null;
  verifiedTestRate: VerifiedTestRate | null;
  submissionDataComplete: boolean;
}

interface DashboardState {
  loading: boolean;
  error: string | null;
  isFirstTime: boolean;
  quests: DashboardQuest[];
  responses: DashboardResponsePreview[];
  stats: DashboardStats;
}

const questIcons = ["/namelogo.png", "/namelogo.png", "/namelogo.png", "/namelogo.png"];

const MAX_RECENT_MISSIONS_FOR_RESPONSES = 3;
const MAX_RESPONSES_SHOWN = 3;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getRelativeTime(value: string): string {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (elapsedSeconds < 60) return "just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  return `${Math.floor(elapsedSeconds / 86400)}d ago`;
}

function shortAddress(address: string): string {
  return address.length > 10 ? `${address.slice(0, 4)}…${address.slice(-4)}` : address;
}

function isCurrentMonth(value: string): boolean {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function getTokenIdentity(mission: MissionResponse): TokenSpend {
  const metadata = asRecord(mission.metadata);
  const token = typeof mission.rewardToken === "string" ? mission.rewardToken.trim() : "";
  const symbol = ["rewardTokenSymbol", "tokenSymbol", "symbol"]
    .map((key) => metadata[key])
    .find(
      (value): value is string => typeof value === "string" && value.trim().length > 0,
    );

  if (token) {
    return {
      key: `address:${token.toLowerCase()}`,
      label: token.length > 10 ? shortAddress(token) : token,
      amount: 0,
    };
  }

  if (symbol) {
    return {
      key: `symbol:${symbol.trim().toLowerCase()}`,
      label: symbol.trim(),
      amount: 0,
    };
  }

  return { key: "unknown", label: "Unspecified token", amount: 0 };
}

function getSpendByToken(missions: MissionResponse[]): TokenSpend[] {
  const totals = new Map<string, TokenSpend>();

  missions
    .filter((mission) => isCurrentMonth(mission.createdAt))
    .forEach((mission) => {
      const amount =
        (asNumber(mission.rewardAmount) ?? 0) * (asNumber(mission.maxParticipants) ?? 0);
      if (!Number.isFinite(amount) || amount <= 0) return;

      const token = getTokenIdentity(mission);
      const existing = totals.get(token.key);
      if (existing) {
        existing.amount += amount;
      } else {
        totals.set(token.key, { ...token, amount });
      }
    });

  return Array.from(totals.values()).sort(
    (a, b) => b.amount - a.amount || a.label.localeCompare(b.label),
  );
}

function mapMissionToDashboardQuest(mission: MissionResponse): DashboardQuest {
  const metadata = asRecord(mission.metadata);
  const token = getTokenIdentity(mission);
  return {
    id: mission.id,
    title: mission.title,
    category: typeof metadata.category === "string" ? metadata.category : "General",
    budget: `${asNumber(mission.rewardAmount) ?? 0} ${token.label}`,
    dueDate: `Updated ${getRelativeTime(mission.updatedAt)}`,
    submissionCount: {
      current: mission._count?.submissions ?? 0,
      total: mission.maxParticipants,
    },
    status: mission.status,
    rewardToken: mission.rewardToken,
    rewardAmount: mission.rewardAmount,
    createdAt: mission.createdAt,
    updatedAt: mission.updatedAt,
  };
}

function DashboardHeader() {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
        Creator Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your workspace is the current set of missions you own.
      </p>
    </header>
  );
}

export default function CreatorDashboard() {
  const { connected, publicKey, connect } = useWallet();
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    loading: true,
    error: null,
    isFirstTime: false,
    quests: [],
    responses: [],
    stats: {
      activeMissions: 0,
      awaitingReview: 0,
      spendByToken: [],
      averageReportQuality: null,
      verifiedTestRate: null,
      submissionDataComplete: true,
    },
  });

  const fetchDashboardData = useCallback(async () => {
    if (!publicKey) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await creatorApiFetch("/missions/me", publicKey);
      if (!response.ok) {
        throw new Error(`Unable to load dashboard data (${response.status})`);
      }

      const missions = (await response.json()) as MissionResponse[];

      const activeMissions = missions.filter(
        (m) => m.status === "OPEN" || m.status === "STARTED",
      );
      const missionsWithSubmissions = missions.filter(
        (m) => (m._count?.submissions ?? 0) > 0,
      );

      let submissionDataComplete = true;
      const submissionsByMission = await Promise.all(
        missionsWithSubmissions.map(async (mission) => {
          try {
            const subsRes = await creatorApiFetch(
              `/missions/${mission.id}/submissions`,
              publicKey,
            );
            if (!subsRes.ok) {
              submissionDataComplete = false;
              return { mission, submissions: [] };
            }
            const subs = (await subsRes.json()) as SubmissionResponse[];
            return {
              mission,
              submissions: subs.map((sub) => ({
                id: sub.id,
                status: sub.status,
                createdAt: sub.createdAt,
                updatedAt: sub.updatedAt,
                hunter: sub.hunter,
              })),
            };
          } catch {
            submissionDataComplete = false;
            return { mission, submissions: [] };
          }
        }),
      );

      const allSubmissions = submissionsByMission.flatMap((entry) => entry.submissions);
      const approvedOrPaid = allSubmissions.filter(
        (sub) => sub.status === "APPROVED" || sub.status === "PAID",
      ).length;
      const verifiedTestRate =
        allSubmissions.length > 0
          ? { approvedOrPaid, total: allSubmissions.length }
          : null;

      const quests = activeMissions.slice(0, 4).map(mapMissionToDashboardQuest);

      // Best few missions to pull submission previews from: most recently
      // updated ones that actually have submissions.
      const previewMissions = [...missionsWithSubmissions]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, MAX_RECENT_MISSIONS_FOR_RESPONSES);

      const responsePreviews = previewMissions
        .flatMap((mission) => {
          const submissions =
            submissionsByMission.find((entry) => entry.mission.id === mission.id)
              ?.submissions ?? [];
          return submissions.map((sub) => ({
            id: sub.id,
            missionId: mission.id,
            respondentName:
              sub.hunter?.displayName ||
              (sub.hunter?.address ? shortAddress(sub.hunter.address) : "Hunter"),
            questTitle: mission.title,
            timeSinceSubmission: getRelativeTime(sub.createdAt),
            status: sub.status,
            rewardToken: mission.rewardToken,
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
          }));
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, MAX_RESPONSES_SHOWN);

      setState({
        loading: false,
        error: null,
        isFirstTime: missions.length === 0,
        quests,
        responses: responsePreviews,
        stats: {
          activeMissions: activeMissions.length,
          awaitingReview: allSubmissions.filter((sub) => sub.status === "PENDING").length,
          spendByToken: getSpendByToken(activeMissions),
          averageReportQuality: null,
          verifiedTestRate,
          submissionDataComplete,
        },
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load dashboard data. Please try again.",
      }));
    }
  }, [publicKey]);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  const handleCreateQuest = () => {
    router.push("/creator/quests/new");
  };

  if (!connected || !publicKey) {
    return (
      <div className="min-h-full text-foreground">
        <section className="px-5 py-6 sm:px-8 lg:px-12">
          <DashboardHeader />
          <EmptyState
            title="Connect your wallet"
            description="Connect your creator wallet to load your missions and dashboard stats."
            variant="card"
            action={{ label: "Connect wallet", onClick: () => void connect() }}
          />
        </section>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="min-h-full text-foreground">
        <section
          role="status"
          aria-live="polite"
          aria-label="Loading creator dashboard"
          className="px-5 py-4 sm:px-8 sm:py-6 lg:px-12"
        >
          <DashboardHeader />
          <DashboardSkeleton />
        </section>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-full text-foreground">
        <section className="px-5 py-4 sm:px-8 sm:py-6 lg:px-12">
          <DashboardHeader />
          <div
            role="alert"
            className="flex flex-col items-center justify-center px-4 py-12 sm:py-20"
          >
            <AlertCircle
              aria-hidden="true"
              className="mb-4 h-12 w-12 text-red-500 sm:h-16 sm:w-16"
            />
            <h2 className="mb-2 text-center text-2xl font-semibold text-foreground">
              Error Loading Dashboard
            </h2>
            <p className="mb-6 text-center text-sm text-muted-foreground sm:text-base">
              {state.error}
            </p>
            <button
              type="button"
              onClick={() => void fetchDashboardData()}
              className="cursor-pointer brutal-border brutal-shadow bg-brutal-cyan px-6 py-3 text-sm font-bold uppercase sm:text-base"
            >
              Try Again
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (state.isFirstTime) {
    return (
      <div className="flex min-h-full flex-col text-foreground">
        <section className="flex-1 px-5 py-4 sm:px-8 sm:py-6 lg:px-12">
          <DashboardHeader />
          <FirstTimeEmptyState />
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col text-foreground">
      <section className="flex-1 px-5 py-4 sm:px-8 sm:py-6 lg:px-12">
        <DashboardHeader />

        <StatsOverview
          activeMissions={state.stats.activeMissions}
          awaitingReview={state.stats.awaitingReview}
          spendByToken={state.stats.spendByToken}
          averageReportQuality={state.stats.averageReportQuality}
          verifiedTestRate={state.stats.verifiedTestRate}
          submissionDataComplete={state.stats.submissionDataComplete}
          onCreateQuest={handleCreateQuest}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 lg:border-r lg:border-foreground/30 lg:pr-8">
            <div className="mb-6 flex items-center justify-between border-b border-foreground/30 pb-4">
              <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
                Active Missions
              </h2>
              <button
                type="button"
                onClick={() => router.push("/creator/quests")}
                className="group flex cursor-pointer items-center space-x-1 text-sm font-bold uppercase text-foreground transition-colors hover:text-brutal-violet"
              >
                <span>View all</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {state.quests.length === 0 ? (
              <NoQuestsEmptyState onCreateQuest={handleCreateQuest} />
            ) : (
              <div className="space-y-9">
                {state.quests.map((quest, index) => (
                  <CreatorQuestCard
                    key={quest.id}
                    id={quest.id}
                    title={quest.title}
                    category={quest.category}
                    budget={quest.budget}
                    dueDate={quest.dueDate}
                    submissionCount={quest.submissionCount}
                    icon={questIcons[index % questIcons.length]}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center justify-between border-b border-foreground/30 pb-4">
              <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
                Recent Reports
              </h2>
              <button
                type="button"
                onClick={() => router.push("/creator/quests")}
                className="group flex cursor-pointer items-center space-x-1 text-sm font-bold uppercase text-foreground transition-colors hover:text-brutal-violet"
              >
                <span>View all</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {state.responses.length === 0 ? (
              <NoResponsesEmptyState />
            ) : (
              <div className="space-y-3">
                {state.responses.map((response) => (
                  <div
                    key={response.id}
                    className="brutal-border brutal-shadow bg-card"
                  >
                    <ResponsePreview
                      id={response.id}
                      respondentName={response.respondentName}
                      questTitle={response.questTitle}
                      timeSinceSubmission={response.timeSinceSubmission}
                    />
                    <p className="border-t border-foreground/20 px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Status: {response.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
