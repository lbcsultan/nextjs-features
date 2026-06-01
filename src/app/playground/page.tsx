import Link from "next/link";
import { NotesPlayground } from "@/components/notes-playground";
import { SiteHeader } from "@/components/site-header";
import { listNotes } from "@/lib/notes";

export const metadata = {
  title: "백엔드 실습",
  description: "Route Handler, Server Action, Health Check API를 직접 테스트해 보세요.",
};

export default function PlaygroundPage() {
  const notes = listNotes();

  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-zinc-500">실습</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          백엔드 기능 테스트
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Next.js App Router의 기본 백엔드 기능을 브라우저에서 바로 확인할 수 있습니다.
          Route Handler REST API, Server Action, Health Check를 모두 사용해 보세요.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs/route-handlers"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Route Handlers 가이드 →
          </Link>
          <Link
            href="/docs/mutating-data"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Server Actions 가이드 →
          </Link>
        </div>

        <div className="mt-10">
          <NotesPlayground initialNotes={notes} />
        </div>
      </div>
    </>
  );
}
