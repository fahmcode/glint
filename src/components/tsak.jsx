import { Button } from "./ui/button";
import {
  BadgeCheck,
  Circle,
  CircleDashed,
  SquarePen,
  Trash,
} from "lucide-react";

const urgencyStyles = {
  low: {
    color: "bg-green-300",
    title: "Low urgency — take your time 🌿",
  },
  medium: {
    color: "bg-yellow-400",
    title: "Medium urgency — needs your attention soon 🔶",
  },
  high: {
    color: "bg-red-500",
    title: "High urgency — act immediately! 🚨",
  },
};

const statusButtonMap = {
  todo: {
    icon: <Circle />,
    label: "Mark as In Progress",
  },
  progress: {
    icon: <CircleDashed />,
    label: "Mark as Done",
  },
  done: {
    icon: <BadgeCheck />,
    label: "Completed",
  },
};

export function Task({ task, onToggle, onEdit, onDelete, onOpen }) {
  const urgency = task.urgency || "low";
  const { color, title } = urgencyStyles[urgency] || urgencyStyles.low;
  const statusMeta = statusButtonMap[task.status];

  return (
    <div
      onClick={() => onOpen(task)}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition"
    >
      {/* Urgency Dot */}
      <div
        className={`w-3 h-3 rounded-full ${color} self-center`}
        title={title}
        aria-label={`Urgency level: ${urgency}`}
      />

      {/* Left Side: Name + Description in one line */}
      <div className="flex items-center gap-2 overflow-hidden">
        <p
          className={`truncate max-w-[40%] font-medium ${
            task.status === "done"
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
          title={task.name}
        >
          {task.name}
        </p>
        <span className="text-gray-300">•</span>
        <p
          className="truncate text-sm text-gray-500 max-w-[50%]"
          title={task.description}
        >
          {task.description}
        </p>
      </div>

      {/* Right Side: Actions + Date */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="secondary"
          disabled={task.status === "done"}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
          title={statusMeta.label}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full p-2"
        >
          {statusMeta.icon}
        </Button>

        <Button
          size="icon"
          title="Edit Task"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <SquarePen />
        </Button>

        <Button
          size="icon"
          title="Delete Task"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Trash />
        </Button>

        {/* Date */}
        <p className="text-sm text-gray-400 ml-2">
          {task.createdAt ?? "30/06/2025"}
        </p>
      </div>
    </div>
  );
}
