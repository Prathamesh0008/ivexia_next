import Image from "next/image";

export function FullScreenLoader({ label = "Loading" }) {
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/navlogo.png"
          alt="Ivexia"
          width={220}
          height={72}
          priority
          className="h-14 w-auto object-contain"
        />
        <div className="mt-8 h-12 w-12 rounded-full border-4 border-[#E2004F]/20 border-t-[#E2004F] animate-spin" />
        <p className="mt-5 text-sm font-medium tracking-[0.18em] uppercase text-[#0d2d47]">
          {label}
        </p>
      </div>
    </div>
  );
}

export function ContentPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFF8F5] pt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-16 animate-pulse">
        <div className="mb-10 rounded-[28px] bg-white/80 px-8 py-12 shadow-sm">
          <div className="mb-4 h-4 w-32 rounded bg-[#19a6b5]/15" />
          <div className="mb-4 h-12 w-2/3 rounded bg-[#0d2d47]/10" />
          <div className="mb-3 h-4 w-full rounded bg-gray-200" />
          <div className="mb-8 h-4 w-5/6 rounded bg-gray-200" />
          <div className="flex flex-wrap gap-3">
            <div className="h-11 w-36 rounded-full bg-white shadow-sm" />
            <div className="h-11 w-36 rounded-full bg-white shadow-sm" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 h-8 w-56 rounded bg-[#0d2d47]/10" />
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="mb-4 h-4 rounded bg-gray-100 last:mb-0"
              />
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 h-8 w-40 rounded bg-[#19a6b5]/10" />
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="mb-4 h-20 rounded-2xl bg-gray-100 last:mb-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GridPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFF8F5] pt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-16 animate-pulse">
        <div className="mb-10 rounded-[28px] bg-white/80 px-8 py-12 shadow-sm">
          <div className="mb-4 h-4 w-28 rounded bg-[#19a6b5]/15" />
          <div className="mb-4 h-12 w-2/3 rounded bg-[#0d2d47]/10" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <div className="h-11 w-44 rounded-full bg-white shadow-sm" />
          <div className="h-11 w-44 rounded-full bg-white shadow-sm" />
          <div className="h-11 w-44 rounded-full bg-white shadow-sm" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 h-8 w-2/3 rounded bg-[#0d2d47]/10" />
              <div className="mb-3 h-4 w-full rounded bg-gray-100" />
              <div className="mb-3 h-4 w-4/5 rounded bg-gray-100" />
              <div className="mt-6 h-10 w-32 rounded-full bg-[#19a6b5]/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
