import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { navigation } from "@/lib/navigation";

const categoryDescriptions: Record<string, string> = {
  "시작하기": "Next.js 기본 개념과 프로젝트 설정",
  "라우팅": "파일 기반 라우팅과 페이지 네비게이션",
  "렌더링": "Server/Client Components와 데이터 처리",
  "데이터": "Server Actions와 API Route Handlers",
  "UI & 스타일": "CSS, 이미지, 폰트, 메타데이터",
  "운영": "에러 처리와 배포",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-zinc-500">Next.js 16 · App Router</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Next.js 주요 기능 가이드
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            App Router 기준으로 Next.js의 핵심 기능을 카테고리별로 정리했습니다.
            왼쪽 메뉴에서 원하는 주제를 선택하거나, 아래 카드에서 바로 시작하세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/introduction"
              className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              가이드 시작하기
            </Link>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-zinc-200 px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              공식 문서 보기
            </a>
          </div>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {navigation.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {category.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {categoryDescriptions[category.title]}
              </p>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {item.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            이 가이드에서 다루는 내용
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "파일 기반 라우팅", icon: "📁" },
              { label: "Server Components", icon: "⚡" },
              { label: "Server Actions", icon: "🔄" },
              { label: "이미지·폰트 최적화", icon: "🎨" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 dark:bg-zinc-950"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
