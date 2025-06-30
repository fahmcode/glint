import { useState } from "react";
import { motion } from "motion/react";

const urgencyOptions = [
  {
    value: "low",
    label: "Low",
    colors: {
      dot: "bg-emerald-400",
      bg: "bg-emerald-50/80",
      border: "border-emerald-200/60",
      text: "text-emerald-700",
    },
  },
  {
    value: "medium",
    label: "Medium",
    description:
      "This task requires your attention soon but is not critical right now.",
    colors: {
      dot: "bg-amber-400",
      bg: "bg-amber-50/80",
      border: "border-amber-200/60",
      text: "text-amber-700",
    },
  },
  {
    value: "high",
    label: "High",
    description:
      "This task demands immediate action and should be prioritized above others.",
    colors: {
      dot: "bg-rose-400",
      bg: "bg-rose-50/80",
      border: "border-rose-200/60",
      text: "text-rose-700",
    },
  },
];

export function UrgencySelector({ value, onChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-600 tracking-wide">
          Task Urgency
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {urgencyOptions.map((option) => (
            <UrgencyCard
              key={option.value}
              {...option}
              isSelected={option.value === value}
              onSelect={() => onChange(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UrgencyCard({ label, colors, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`
        relative flex items-center justify-center gap-3 rounded-2xl px-4 py-4
        text-sm font-medium transition-all duration-300 ease-out
        border backdrop-blur-sm
        ${
          isSelected
            ? `${colors.bg} ${colors.border} shadow-lg shadow-black/5 scale-[1.02]`
            : "bg-white/80 border-slate-200/60 hover:bg-slate-50/80 hover:border-slate-300/60 hover:shadow-md hover:shadow-black/5"
        }
      `}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-pressed={isSelected}
      aria-label={`${label} urgency level`}
    >
      <motion.div
        className={`w-3 h-3 rounded-full ${colors.dot} shadow-sm`}
        animate={{
          scale: isSelected ? 1.1 : 1,
          boxShadow: isSelected
            ? "0 0 0 3px rgba(0,0,0,0.1)"
            : "0 1px 2px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <span
        className={`${
          isSelected ? colors.text : "text-slate-700"
        } transition-colors duration-200`}
      >
        {label}
      </span>

      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

// Example usage component
export default function Component() {
  const [urgency, setUrgency] = useState("low");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">
            Task Priority
          </h1>
          <p className="text-slate-600">
            Choose the urgency level for your task
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/20">
          <UrgencySelector value={urgency} onChange={setUrgency} />
        </div>
      </div>
    </div>
  );
}
