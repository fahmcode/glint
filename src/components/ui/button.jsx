import clsx from "clsx";

export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition cursor-pointer";

  const variants = {
    default:
      "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 border border-transparent",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 border border-gray-200",
    outline:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 border border-transparent",
  };

  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-sm px-3 py-2", // Default
    lg: "text-base px-4 py-2.5",
    icon: "p-2 w-9 h-9", // Square icon button
  };

  return (
    <button
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
