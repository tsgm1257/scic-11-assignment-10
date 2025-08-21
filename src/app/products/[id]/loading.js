import Container from "@/components/Container";

export default function Loading() {
  return (
    <main>
      <Container className="py-6 space-y-6">
        <div className="h-5 w-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-7 w-2/3 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            <div className="h-5 w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            <div className="h-20 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            <div className="h-10 w-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
          </div>
        </div>
      </Container>
    </main>
  );
}
