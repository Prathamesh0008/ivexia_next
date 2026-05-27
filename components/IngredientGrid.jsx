//ivexia\components\IngredientGrid.jsx
"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
export default function IngredientGrid({
  items = [],
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  const router = useRouter();
const { translations } = useLanguage();

  function openIngredientPath(event, path) {
    if (event.ctrlKey || event.metaKey) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(path);
  }

  return (
    <div className="w-full">
      <div className="hidden overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm md:block">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-[#0d2d47] text-white">
            <tr>
              <th className="border-r border-gray-500 px-4 py-3 text-left font-semibold">
                {translations?.ingredientGrid?.name}
              </th>
              <th className="px-4 py-3 text-left font-semibold">{translations?.ingredientGrid?.noResults || "No results found"}</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={2} className="border-t py-10 text-center text-gray-600">
                  {translations?.ingredientGrid?.category}
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={item.id || item.slug || index}
                  onClick={(event) =>
                    openIngredientPath(event, `/products/ingredient/${item.slug}`)
                  }
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border-t border-r px-4 py-3 font-semibold text-[#0d2d47]">
                    {item.name || item.title || item.nameKey || "Unnamed"}
                  </td>
                  <td className="border-t px-4 py-3">
                    {item.category || item.categoryKey || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {items.length === 0 ? (
          <p className="py-10 text-center text-gray-600">{translations?.ingredientGrid?.noResults || "No results found"}</p>
        ) : (
          items.map((item, index) => (
            <button
              key={item.id || item.slug || index}
              type="button"
              onClick={(event) =>
                openIngredientPath(event, `/products/ingredient/${item.slug}`)
              }
              className="w-full rounded-xl border border-gray-300 bg-white p-4 text-left shadow-sm transition active:scale-[0.98]"
            >
              <p className="text-base font-semibold leading-snug text-[#0d2d47]">
                {item.name || item.title || item.nameKey || "Unnamed"}
              </p>

              <div className="mt-2 text-sm text-gray-700">
                <span className="font-medium">{translations?.ingredientGrid?.category}:</span>{" "}
                {item.category || item.categoryKey || "-"}
              </div>
            </button>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              page <= 1 ? "cursor-not-allowed opacity-40" : "hover:bg-white"
            }`}
          >
          {translations?.ingredientGrid?.prev || "Prev"}
          </button>

          <div className="text-sm text-gray-700">
            {translations?.ingredientGrid?.page || "Page"} <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              page >= totalPages ? "cursor-not-allowed opacity-40" : "hover:bg-white"
            }`}
          >
           {translations?.ingredientGrid?.next || "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
