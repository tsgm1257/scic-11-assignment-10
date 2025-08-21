import Container from "@/components/Container";

function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main>
      <Container className="py-6 space-y-6">
        <div className="h-8 w-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
