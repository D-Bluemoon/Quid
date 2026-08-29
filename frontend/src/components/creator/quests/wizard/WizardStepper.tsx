import { Check } from "lucide-react";
import { WIZARD_STEPS } from "./types";

export default function WizardStepper({
  currentIndex,
  maxReachedIndex,
  onStepClick,
}: {
  currentIndex: number;
  maxReachedIndex: number;
  onStepClick: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted = index < maxReachedIndex;
        const isCurrent = index === currentIndex;
        const isReachable = index <= maxReachedIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="h-px w-4 shrink-0 bg-white/10 sm:w-6" />
            ) : null}
            <button
              type="button"
              disabled={!isReachable}
              onClick={() => onStepClick(index)}
              className={`flex items-center gap-1.5 ${isReachable ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isCompleted
                    ? "bg-[#8B5CF6] text-foreground"
                    : isCurrent
                      ? "bg-[#8B5CF6] text-foreground"
                      : "bg-white/10 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="size-3" /> : index + 1}
              </span>
              <span
                className={`whitespace-nowrap text-sm ${
                  isCurrent
                    ? "font-semibold text-foreground"
                    : isCompleted
                      ? "text-muted-foreground"
                      : "text-foreground/35"
                }`}
              >
                {step.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
