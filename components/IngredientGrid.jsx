//ivexia\components\IngredientGrid.jsx
"use client";

import { useRouter } from "next/navigation";

export default function IngredientGrid({
  items = [],
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  const router = useRouter();

  const goToItem = (slug) => {
    // Your old route was /portfolio/:slug
    router.push(`/portfolio/${slug}`);
  };

  return (
    <div className="w-full">
      {/* =========================
          DESKTOP / TABLET TABLE
      ========================= */}
      <div className="hidden md:block bg-white border border-gray-300 shadow-sm overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0d2d47] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold border-r border-gray-500 text-left">
                Name
              </th>
              <th className="px-4 py-3 font-semibold text-left">Category</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-10 text-gray-600 border-t">
                  No results found
                </td>
              </tr>
            ) : (
              items.map((i, index) => (
                <tr
                  key={i.id || i.slug || index}
                  onClick={() => goToItem(i.slug)}
                  className={`cursor-pointer transition hover:bg-[#FFF8F5]
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 border-t border-r font-semibold text-[#0d2d47]">
                    {i.name || i.title || i.nameKey || "Unnamed"}
                  </td>
                  <td className="px-4 py-3 border-t">
                    {i.category || i.categoryKey || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          MOBILE CARDS
      ========================= */}
      <div className="md:hidden space-y-4">
        {items.length === 0 ? (
          <p className="text-center text-gray-600 py-10">No results found</p>
        ) : (
          items.map((i, index) => (
            <button
              key={i.id || i.slug || index}
              onClick={() => goToItem(i.slug)}
              className="
                w-full text-left
                bg-white border border-gray-300 rounded-xl
                p-4 shadow-sm
                active:scale-[0.98]
                transition
              "
              type="button"
            >
              <p className="text-base font-semibold text-[#0d2d47] leading-snug">
                {i.name || i.title || i.nameKey || "Unnamed"}
              </p>

              <div className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Category:</span>{" "}
                {i.category || i.categoryKey || "—"}
              </div>
            </button>
          ))
        )}
      </div>

      {/* =========================
          PAGINATION
      ========================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition
              ${page <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
            `}
          >
            Prev
          </button>

          <div className="text-sm text-gray-700">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition
              ${page >= totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
            `}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}