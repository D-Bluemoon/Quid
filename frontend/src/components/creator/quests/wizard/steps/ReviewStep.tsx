import Image from "next/image";
import stellarIcon from "../../../../../../public/quest-detail/stellar-icon.png";
import { rewardCalculations, type QuestWizardData } from "../types";

export default function ReviewStep({ data }: { data: QuestWizardData }) {
  const { rewardPerWinner } = rewardCalculations(data.rewards);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        This is what participants need to understand and complete your quest.
      </p>

      <div className=" border border-foreground/30 bg-[#100D1C]/60 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Quest details</p>
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Title</p>
            <p className="mt-0.5 text-foreground">
              {data.basics.title || "Untitled quest"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Short description</p>
            <p className="mt-0.5 leading-relaxed text-muted-foreground">
              {data.basics.description || "—"}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {data.basics.completionDuration} est. completion
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className=" border border-foreground/30 bg-[#100D1C]/60 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">Eligibility</p>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Title</p>
              <p className="mt-0.5 text-foreground">{data.eligibility.whoCanParticipate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Limit</p>
              <p className="mt-0.5 text-foreground">
                {data.basics.participantLimit} participant
              </p>
            </div>
          </div>
        </div>

        <div className=" border border-foreground/30 bg-[#100D1C]/60 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">Rewards</p>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Total pool</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-foreground">
                <Image src={stellarIcon} alt="" width={14} height={14} className="h-3.5 w-3.5" />
                {data.rewards.totalRewardBudget.toLocaleString()} XLM
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Winners</p>
              <p className="mt-0.5 text-foreground">
                {data.rewards.numberOfWinners} slots ·{" "}
                {rewardPerWinner.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                XLM each
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" border border-foreground/30 bg-[#100D1C]/60 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Tasks</p>
        <div className="flex flex-col gap-3 text-sm">
          {data.tasks.map((task, index) => (
            <div key={task.id}>
              <p className="text-xs font-semibold text-muted-foreground">
                TASK {index + 1}
              </p>
              <p className="mt-0.5 text-foreground">{task.title || "Untitled task"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
