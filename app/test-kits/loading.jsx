export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-[#FFF8F5] pt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="animate-pulse">
          <div className="mx-auto mb-4 h-10 w-56 rounded bg-[#0d2d47]/10" />
          <div className="mx-auto mb-8 h-5 w-96 max-w-full rounded bg-gray-200" />
          <div className="mx-auto mb-6 h-12 max-w-4xl rounded-full bg-white" />
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <div className="h-10 w-32 rounded-full bg-white" />
            <div className="h-10 w-32 rounded-full bg-white" />
            <div className="h-10 w-32 rounded-full bg-white" />
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="h-12 bg-[#0d2d47]" />
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-12 border-b border-gray-100 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
