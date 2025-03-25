import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="grid grid-cols-2 space-y-3 lg:grid-cols-4 gap-4 m-auto px-12">
      <Skeleton className="h-16 w-[250px]" />
      <Skeleton className="h-16 w-[200px]" />
      <Skeleton className="h-16 w-[250px]" />
      <Skeleton className="h-16 w-[200px]" />
      <Skeleton className="h-16 w-[250px]" />
      <Skeleton className="h-16 w-[200px]" />
      <Skeleton className="h-16 w-[250px]" />
      <Skeleton className="h-16 w-[200px]" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="text-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 flex items-center mx-auto text-white animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </svg>
    </div>
  );
}
