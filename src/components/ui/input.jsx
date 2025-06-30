import clsx from "clsx";

export function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-semibold text-gray-700 px-1"
        >
          {label}
        </label>
      )}
      <input
        id={props.id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-colors duration-200",
          "hover:border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
