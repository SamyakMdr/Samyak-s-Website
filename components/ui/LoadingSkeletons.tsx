import { a11y } from "@/content/site";
import { cn } from "@/lib/cn";
import { Skeleton } from "./Skeleton";

function LoadingStatus({ label = a11y.loadingPage }: { label?: string }) {
  return <span role="status" className="sr-only">{label}</span>;
}

function ProjectCardSkeleton() {
  return (
    <li className="flex min-w-0 flex-col gap-4 rounded-card border border-line bg-panel p-3.5">
      <Skeleton className="aspect-video w-full rounded-md" />
      <div className="flex flex-col gap-3 px-1 pb-1">
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="ml-auto size-8 rounded-btn" />
          <Skeleton className="size-8 rounded-btn" />
        </div>
      </div>
    </li>
  );
}

export function HomePageSkeleton() {
  return (
    <main aria-busy="true" className="pt-(--header-h)">
      <LoadingStatus />
      <section className="page-x grid min-h-[calc(100svh-var(--header-h))] items-center gap-8 py-10 desktop:grid-cols-2 desktop:gap-10">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-7 w-44 rounded-full" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-14 w-full max-w-150" />
            <Skeleton className="h-14 w-4/5 max-w-125" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full max-w-140" />
            <Skeleton className="h-5 w-5/6 max-w-120" />
          </div>
          <div className="flex gap-3 pt-2 max-tablet:flex-col">
            <Skeleton className="h-12 w-36 rounded-btn max-tablet:w-full" />
            <Skeleton className="h-12 w-36 rounded-btn max-tablet:w-full" />
          </div>
        </div>
        <div className="rounded-win border border-line bg-code-bg p-4 tablet:p-6">
          <div className="mb-5 flex gap-2">
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="size-3 rounded-full" />
            <Skeleton className="size-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton
                key={index}
                className={cn("h-4", index % 3 === 0 ? "w-3/5" : index % 2 === 0 ? "w-4/5" : "w-full")}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProjectsPageSkeleton() {
  return (
    <main aria-busy="true" className="pt-(--header-h)">
      <LoadingStatus />
      <header className="page-x flex flex-col gap-4 pt-8 pb-8 tablet:pt-18">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-14 w-72 max-w-full" />
        <Skeleton className="h-5 w-full max-w-150" />
      </header>
      <div className="page-x flex flex-col gap-4 pb-8">
        <Skeleton className="h-12 w-full rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
      <ul className="page-x grid grid-cols-1 gap-4 pb-24 tablet:grid-cols-2 tablet:gap-5 desktop:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => <ProjectCardSkeleton key={index} />)}
      </ul>
    </main>
  );
}

export function ProjectRoomSkeleton() {
  return (
    <main aria-busy="true" className="pt-(--header-h)">
      <LoadingStatus />
      <article className="page-x flex flex-col gap-9 pt-5 pb-24 tablet:gap-14 tablet:pt-10">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="ml-auto h-10 w-24 rounded-btn max-tablet:hidden" />
          <Skeleton className="h-10 w-24 rounded-btn max-tablet:hidden" />
          <Skeleton className="size-10 rounded-btn" />
        </div>
        <div className="grid grid-cols-1 gap-9 tablet:gap-14 desktop:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-7 w-44 rounded-full" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-12 w-36 rounded-btn" />
          </div>
          <div className="flex flex-col gap-4 rounded-card border border-line bg-panel p-5">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0 last:pb-0">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
          <Skeleton className="aspect-video w-full rounded-win desktop:col-span-2" />
        </div>
      </article>
    </main>
  );
}

export function ContactFormSkeleton({ className }: { className?: string }) {
  return (
    <div aria-busy="true" className={cn("overflow-hidden rounded-lg border border-line bg-panel", className)}>
      <LoadingStatus label={a11y.loadingContactForm} />
      <div className="flex gap-2.5 bg-panel-2 px-5 py-3.5">
        <Skeleton className="h-7 w-40 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      <div className="flex flex-col gap-4 p-4.5 tablet:p-6">
        <div className="grid gap-4 tablet:grid-cols-2">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-12 w-36 rounded-btn max-tablet:w-full" />
      </div>
    </div>
  );
}

export function TerminalOutputSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-2 py-1">
      <LoadingStatus label={a11y.loadingTerminalOutput} />
      <Skeleton className="h-4 w-3/5 bg-dim/25" />
      <Skeleton className="h-4 w-4/5 bg-dim/25" />
      <Skeleton className="h-4 w-2/5 bg-dim/25" />
    </div>
  );
}
