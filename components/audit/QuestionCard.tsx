import { Question } from "./QuestionnaireData";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const QuestionCard = ({
  question,
  value,
  onChange,
  error,
}: QuestionCardProps) => {
  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleMultiSelect = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];

    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v: string) => v !== optionValue));
    } else {
      // Check max selections
      if (
        question.maxSelections &&
        currentValues.length >= question.maxSelections
      ) {
        // Remove first and add new
        onChange([...currentValues.slice(1), optionValue]);
      } else {
        onChange([...currentValues, optionValue]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
          {question.question}
          {question.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </h3>
        {question.why && (
          <p className="text-sm text-muted-foreground mb-2">{question.why}</p>
        )}
        {question.maxSelections && (
          <p className="text-sm text-primary/80">
            (vyber max {question.maxSelections})
          </p>
        )}
      </div>

      {question.type === "text" ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none min-h-[100px]"
        />
      ) : (
        <div className="grid gap-3">
          {question.options?.map((option) => {
            const isSelected =
              question.type === "single"
                ? value === option.value
                : Array.isArray(value) && value.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  question.type === "single"
                    ? handleSingleSelect(option.value)
                    : handleMultiSelect(option.value)
                }
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left transition-all duration-200",
                  "border-2",
                  isSelected
                    ? "bg-primary/10 border-primary text-foreground"
                    : "bg-background/50 border-border hover:border-primary/50 text-foreground/80 hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                      question.type === "multi" && "rounded",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground",
                    )}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default QuestionCard;
