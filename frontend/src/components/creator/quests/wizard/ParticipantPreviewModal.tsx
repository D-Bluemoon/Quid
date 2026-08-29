"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { formatDateTime, rewardCalculations, type QuestWizardData } from "./types";

export default function ParticipantPreviewModal({
  data,
  onClose,
}: {
  data: QuestWizardData;
  onClose: () => void;
}) {
  const { rewardPerWinner } = rewardCalculations(data.rewards);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl  border border-foreground/30 bg-background brutal-grid-bg p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Participant preview
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <h3 className="text-xl font-semibold text-foreground">
          {data.basics.title || "Untitled quest"}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Image
            src="/namelogo.png"
            alt=""
            width={16}
            height={16}
            className="size-4 rounded object-cover"
          />
          Ruze.Stellar
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {data.basics.description || "No description provided yet."}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-4 border-y border-foreground/30 py-4">
          <div>
            <p className="text-xs text-muted-foreground">Reward</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {rewardPerWinner.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              XLM
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {data.basics.completionDuration}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Closes</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {formatDateTime(data.schedule.closingDateTime)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            What you&apos;ll do
          </p>
          <ol className="flex flex-col gap-3">
            {data.tasks.map((task, index) => (
              <li key={task.id} className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/20 text-xs font-semibold text-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-foreground">
                    {task.title || "Untitled task"}
                  </p>
                  {task.instruction ? (
                    <p className="text-xs text-muted-foreground">{task.instruction}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
