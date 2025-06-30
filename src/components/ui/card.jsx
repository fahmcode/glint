export function Card({ title, actions, children }) {
  return (
    <div className="bg-gray-100 text-gray-700 rounded-2xl p-2 min-w-3xl">
      {/* header */}
      <div className="flex items-center justify-between p-2">
        <h3 className="text-sm font-semibold uppercase text-gray-600">
          {title}
        </h3>
        {actions}
      </div>

      {/* Content */}
      <div className="bg-white  rounded-xl">{children}</div>
    </div>
  );
}
