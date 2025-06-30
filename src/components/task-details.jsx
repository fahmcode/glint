import { Calendar, RefreshCw, Clock, CheckCircle2 } from "lucide-react";
import { Modal } from "./ui/modal";

const urgencyColors = {
  low: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200/60",
    dot: "bg-emerald-400",
  },
  medium: {
    bg: "bg-amber-50/80",
    text: "text-amber-700",
    border: "border-amber-200/60",
    dot: "bg-amber-400",
  },
  high: {
    bg: "bg-rose-50/80",
    text: "text-rose-700",
    border: "border-rose-200/60",
    dot: "bg-rose-400",
  },
};

const statusColors = {
  todo: {
    bg: "bg-slate-50/80",
    text: "text-slate-600",
    border: "border-slate-200/60",
    icon: Clock,
  },
  progress: {
    bg: "bg-blue-50/80",
    text: "text-blue-700",
    border: "border-blue-200/60",
    icon: RefreshCw,
  },
  done: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200/60",
    icon: CheckCircle2,
  },
};

export function TaskDetails({ isOpen, onClose, task }) {
  if (!task) return null;

  const { name, description, status, urgency, createdAt, updatedAt } = task;
  const urgencyLabel = urgency.charAt(0).toUpperCase() + urgency.slice(1);
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  const StatusIcon = statusColors[status].icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="lg">
      <div className="space-y-8">
        {/* Task Header */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 leading-tight">
            {name}
          </h2>

          {/* Status and Urgency Badges */}
          <div className="flex flex-wrap gap-3">
            <div
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                border backdrop-blur-sm
                ${urgencyColors[urgency].bg} ${urgencyColors[urgency].text} ${urgencyColors[urgency].border}
              `}
            >
              <div
                className={`w-2 h-2 rounded-full ${urgencyColors[urgency].dot}`}
              />
              <span>Urgency: {urgencyLabel}</span>
            </div>

            <div
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                border backdrop-blur-sm
                ${statusColors[status].bg} ${statusColors[status].text} ${statusColors[status].border}
              `}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>Status: {statusLabel}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-50/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/40">
          <h3 className="text-sm font-medium text-slate-600 mb-3 uppercase tracking-wide">
            Description
          </h3>
          <div className="text-slate-700 leading-relaxed">
            {description ? (
              <p className="whitespace-pre-wrap">{description}</p>
            ) : (
              <p className="text-slate-500 italic">No description provided.</p>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/40">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100/80 rounded-xl">
                <Calendar className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Created
                </p>
                <p className="text-sm text-slate-700 font-medium">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/40">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100/80 rounded-xl">
                <RefreshCw className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Last Updated
                </p>
                {updatedAt ? (
                  <>
                    <p className="text-sm text-slate-700 font-medium">
                      {new Date(updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(updatedAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Not updated yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
