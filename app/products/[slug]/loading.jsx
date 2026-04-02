export default function Loading() {
  return (
    <div className="bg-[#FFF8F5] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 animate-pulse">
        <div className="bg-white shadow-md p-8 lg:p-10 grid lg:grid-cols-2 gap-10 rounded-lg">
          <div className="h-[320px] rounded-lg bg-gray-100" />
          <div className="space-y-5">
            <div className="h-10 w-3/4 rounded bg-[#0d2d47]/10" />
            <div className="flex gap-2">
              <div className="h-7 w-28 rounded-full bg-gray-200" />
              <div className="h-7 w-32 rounded-full bg-gray-200" />
            </div>
            <div className="h-10 w-full rounded bg-gray-100" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
            <div className="h-11 w-40 rounded bg-gray-200" />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-20 rounded-lg bg-white shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
