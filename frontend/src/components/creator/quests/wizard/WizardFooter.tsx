import { ArrowRight, Eye, Save } from "lucide-react";

export default function WizardFooter({
  isFirstStep,
  isLastStep,
  canContinue,
  publishing,
  onBack,
  onPreview,
  onSaveDraft,
  onContinue,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  canContinue: boolean;
  publishing: boolean;
  onBack: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-foreground/30 px-6 py-4">
      {isFirstStep ? (
        <span />
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </button>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-1.5  border border-white/15 px-3.5 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
        >
          <Eye className="size-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={onSaveDraft}
          className="flex items-center gap-1.5  border border-white/15 px-3.5 py-2 text-sm text-foreground transition-colors hover:bg-white/5"
        >
          <Save className="size-4" />
          Save as draft
        </button>
        <button
          type="button"
          disabled={!canContinue || publishing}
          onClick={onContinue}
          className="flex items-center gap-1.5  bg-brutal-violet px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-brutal-violet disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-muted-foreground"
        >
          {publishing ? "Publishing…" : isLastStep ? "Publish mission" : "Continue"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
