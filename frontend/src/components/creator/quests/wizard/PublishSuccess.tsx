import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PublishSuccess({
  questId,
  missionId,
  txHash,
  warning,
}: {
  questId: string | null;
  missionId: string;
  txHash: string;
  warning?: string;
}) {
  return (
    <div className="flex h-full min-h-[calc(100vh-5rem)] flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <Image
        src="/dashboard/star-q.svg"
        alt=""
        width={80}
        height={80}
        className="size-20"
      />
      <h2 className="text-2xl font-semibold text-foreground">Mission Published</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Mission #{missionId} is escrowed on Stellar testnet.
      </p>
      <p className="max-w-lg break-all text-xs text-muted-foreground">
        Transaction: {txHash}
      </p>
      {warning ? (
        <p role="status" className="max-w-lg text-sm text-amber-300">
          {warning}
        </p>
      ) : null}
      <div className="mt-2 flex items-center gap-3">
        <Link
          href="/creator/quests"
          className=" border border-white/15 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
        >
          Close
        </Link>
        {questId ? (
          <Link
            href={`/creator/quests/${questId}`}
            className="flex items-center gap-1.5  bg-brutal-violet px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-brutal-violet"
          >
            View mission
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
