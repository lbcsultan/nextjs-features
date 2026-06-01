import type { FeatureContent } from "./types";

export const features: Record<string, FeatureContent> = {
  introduction: {
    slug: "introduction",
    title: "Next.js 소개",
    description:
      "Next.js는 React 기반 풀스택 웹 프레임워크로, 라우팅·렌더링·데이터 처리를 하나의 프로젝트에서 다룰 수 있습니다.",
    sections: [
      {
        title: "Next.js란?",
        content:
          "Next.js는 Vercel이 만든 React 프레임워크입니다. App Router를 중심으로 파일 기반 라우팅, Server Components, Server Actions, Route Handlers 등 현대적인 웹 개발에 필요한 기능을 기본 제공합니다.",
      },
      {
        title: "주요 특징",
        content:
          "• App Router: `app/` 폴더 기반의 직관적인 라우팅\n• Server Components: 서버에서 UI를 렌더링해 JS 번들 크기를 줄임\n• Server Actions: 폼 제출과 데이터 변경을 서버 함수로 처리\n• 내장 최적화: 이미지, 폰트, 메타데이터 자동 최적화\n• Turbopack: 빠른 개발 서버와 빌드 (기본값)",
        tips: [
          "이 가이드는 Next.js 16 App Router 기준으로 작성되었습니다.",
          "Pages Router(`pages/`)도 지원하지만, 신규 프로젝트는 App Router를 권장합니다.",
        ],
      },
      {
        title: "개발 환경 요구사항",
        content:
          "Node.js 20.9 이상, macOS / Windows(WSL 포함) / Linux를 지원합니다. Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+ 브라우저를 기본 지원합니다.",
      },
    ],
    relatedLinks: [
      { label: "공식 문서", href: "https://nextjs.org/docs" },
      { label: "Next.js Learn", href: "https://nextjs.org/learn" },
    ],
  },

  "project-structure": {
    slug: "project-structure",
    title: "프로젝트 구조",
    description:
      "Next.js 프로젝트의 폴더와 파일 규칙을 이해하면 라우트와 기능을 빠르게 구성할 수 있습니다.",
    sections: [
      {
        title: "최상위 폴더",
        content:
          "`app/` — App Router 라우트와 레이아웃\n`public/` — 정적 파일 (이미지, favicon 등)\n`src/` — 선택적 소스 폴더 (`src/app/` 구조 사용 시)",
      },
      {
        title: "라우팅 파일 규칙",
        content:
          "App Router는 특수 파일 이름으로 동작을 정의합니다.",
        code: {
          filename: "app/ 구조 예시",
          language: "text",
          snippet: `app/
├── layout.tsx      # 공통 레이아웃
├── page.tsx          # / 경로
├── loading.tsx       # 로딩 UI
├── error.tsx         # 에러 UI
├── not-found.tsx     # 404 UI
├── blog/
│   ├── page.tsx      # /blog
│   └── [slug]/
│       └── page.tsx  # /blog/:slug (동적 라우트)
└── api/
    └── route.ts      # API Route Handler`,
        },
      },
      {
        title: "설정 파일",
        content:
          "`next.config.ts` — Next.js 설정\n`package.json` — 의존성과 스크립트\n`tsconfig.json` — TypeScript 설정\n`.env.local` — 로컬 환경 변수 (Git에 커밋하지 않음)",
      },
    ],
  },

  installation: {
    slug: "installation",
    title: "설치 및 실행",
    description: "create-next-app으로 프로젝트를 생성하고 개발 서버를 실행하는 방법입니다.",
    sections: [
      {
        title: "프로젝트 생성",
        content: "CLI로 새 프로젝트를 만들 수 있습니다. `--yes` 플래그는 기본 설정으로 빠르게 생성합니다.",
        code: {
          filename: "터미널",
          language: "bash",
          snippet: `npx create-next-app@latest my-app --yes
cd my-app
npm run dev`,
        },
        tips: [
          "기본 설정: TypeScript, Tailwind CSS, ESLint, App Router, Turbopack",
          "import alias `@/*`가 자동으로 설정됩니다.",
        ],
      },
      {
        title: "주요 npm 스크립트",
        content:
          "`npm run dev` — 개발 서버 (http://localhost:3000)\n`npm run build` — 프로덕션 빌드\n`npm run start` — 프로덕션 서버 실행\n`npm run lint` — ESLint 검사",
      },
    ],
  },

  "layouts-and-pages": {
    slug: "layouts-and-pages",
    title: "레이아웃과 페이지",
    description:
      "파일 시스템 기반 라우팅으로 페이지와 레이아웃을 정의하는 방법을 설명합니다.",
    sections: [
      {
        title: "페이지 만들기",
        content:
          "`app` 디렉터리에 `page.tsx`를 추가하고 React 컴포넌트를 default export하면 해당 경로의 UI가 됩니다.",
        code: {
          filename: "app/page.tsx",
          language: "tsx",
          snippet: `export default function Page() {
  return <h1>Hello Next.js!</h1>
}`,
        },
      },
      {
        title: "레이아웃 만들기",
        content:
          "레이아웃은 여러 페이지에서 공유하는 UI입니다. 네비게이션 시 상태가 유지되고 리렌더링되지 않습니다.",
        code: {
          filename: "app/layout.tsx",
          language: "tsx",
          snippet: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}`,
        },
      },
      {
        title: "동적 라우트",
        content:
          "대괄호 폴더 `[slug]`로 동적 세그먼트를 만듭니다. Next.js 16에서는 `params`가 Promise이므로 await해야 합니다.",
        code: {
          filename: "app/blog/[slug]/page.tsx",
          language: "tsx",
          snippet: `export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <h1>Post: {slug}</h1>
}`,
        },
      },
    ],
  },

  "linking-and-navigating": {
    slug: "linking-and-navigating",
    title: "링크와 네비게이션",
    description:
      "`<Link>` 컴포넌트와 라우터 훅으로 클라이언트 사이드 네비게이션을 구현합니다.",
    sections: [
      {
        title: "Link 컴포넌트",
        content:
          "`<a>` 대신 `next/link`의 `<Link>`를 사용하면 클라이언트 사이드 전환, 프리페칭, 스크롤 복원 등을 자동으로 처리합니다.",
        code: {
          filename: "app/ui/nav.tsx",
          language: "tsx",
          snippet: `import Link from 'next/link'

export function Nav() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/blog">블로그</Link>
    </nav>
  )
}`,
        },
      },
      {
        title: "프로그래밍 방식 네비게이션",
        content:
          "Client Component에서 `useRouter`로 페이지 이동이 가능합니다. App Router에서는 `next/navigation`을 사용합니다.",
        code: {
          filename: "app/ui/button.tsx",
          language: "tsx",
          snippet: `'use client'

import { useRouter } from 'next/navigation'

export function GoButton() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/dashboard')}>
      대시보드로 이동
    </button>
  )
}`,
        },
      },
      {
        title: "현재 경로 확인",
        content:
          "`usePathname()` — 현재 경로\n`useSearchParams()` — URL 쿼리 파라미터\n`useParams()` — 동적 라우트 파라미터",
        tips: [
          "위 훅들은 Client Component에서만 사용할 수 있습니다.",
        ],
      },
    ],
  },

  "server-client-components": {
    slug: "server-client-components",
    title: "Server / Client Components",
    description:
      "서버와 클라이언트에서 각각 UI를 렌더링하는 React Server Components 모델을 설명합니다.",
    sections: [
      {
        title: "기본 동작",
        content:
          "App Router의 layout과 page는 기본적으로 Server Component입니다. 서버에서 데이터를 가져오고 HTML을 생성한 뒤 클라이언트로 스트리밍합니다.",
      },
      {
        title: "Client Component가 필요한 경우",
        content:
          "• state와 이벤트 핸들러 (`onClick`, `onChange`)\n• `useEffect` 등 라이프사이클 로직\n• `localStorage`, `window` 등 브라우저 API\n• 커스텀 훅 사용",
        code: {
          filename: "app/ui/counter.tsx",
          language: "tsx",
          snippet: `'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`,
        },
      },
      {
        title: "Server Component가 적합한 경우",
        content:
          "• DB/API에서 데이터 페칭\n• API 키 등 비밀 값 사용\n• JS 번들 크기 감소\n• FCP 개선 및 점진적 스트리밍",
        code: {
          filename: "app/blog/page.tsx",
          language: "tsx",
          snippet: `import { Counter } from '@/app/ui/counter'
import { getPosts } from '@/lib/data'

export default async function Page() {
  const posts = await getPosts()
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
      <Counter />
    </div>
  )
}`,
        },
        tips: [
          "Server Component에서 Client Component를 import할 수 있지만, 그 반대는 불가능합니다.",
          "Client Component 안에서 Server Component를 children으로 전달하는 패턴을 자주 사용합니다.",
        ],
      },
    ],
  },

  "fetching-data": {
    slug: "fetching-data",
    title: "데이터 페칭",
    description:
      "Server Component와 Client Component에서 데이터를 가져오고 스트리밍하는 방법입니다.",
    sections: [
      {
        title: "Server Component에서 fetch",
        content:
          "async Server Component에서 `fetch` API나 ORM/DB 클라이언트를 직접 사용할 수 있습니다.",
        code: {
          filename: "app/blog/page.tsx",
          language: "tsx",
          snippet: `export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}`,
        },
        tips: [
          "동일한 fetch 요청은 React 컴포넌트 트리에서 자동으로 메모이제이션됩니다.",
          "fetch는 기본적으로 캐시되지 않으며, `use cache` 지시어로 캐싱할 수 있습니다.",
        ],
      },
      {
        title: "스트리밍과 Suspense",
        content:
          "느린 데이터는 `<Suspense>`로 감싸 로딩 UI를 보여주며 점진적으로 렌더링할 수 있습니다.",
        code: {
          filename: "app/dashboard/page.tsx",
          language: "tsx",
          snippet: `import { Suspense } from 'react'

async function SlowData() {
  const data = await fetch('https://api.example.com/slow')
  return <div>{/* ... */}</div>
}

export default function Page() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <SlowData />
    </Suspense>
  )
}`,
        },
      },
      {
        title: "loading.tsx",
        content:
          "`loading.tsx` 파일을 추가하면 해당 세그먼트의 Suspense fallback을 자동으로 제공합니다. 스켈레톤 UI를 여기에 정의합니다.",
      },
    ],
  },

  "mutating-data": {
    slug: "mutating-data",
    title: "데이터 변경 (Server Actions)",
    description:
      "Server Functions( Server Actions )로 폼 제출과 데이터 변경을 서버에서 처리합니다.",
    sections: [
      {
        title: "Server Function이란?",
        content:
          "서버에서 실행되는 비동기 함수입니다. `'use server'` 지시어로 표시하며, 폼의 `action` prop이나 `formAction`으로 호출됩니다. POST 요청으로만 실행됩니다.",
      },
      {
        title: "Server Action 정의",
        content:
          "함수 상단 또는 별도 파일 최상단에 `'use server'`를 선언합니다. 항상 인증·권한 검사를 수행해야 합니다.",
        code: {
          filename: "app/lib/actions.ts",
          language: "ts",
          snippet: `'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // DB에 저장
  // revalidatePath('/blog') 로 캐시 갱신
}`,
        },
      },
      {
        title: "폼에서 사용",
        content:
          "Server Action을 `<form action={createPost}>`에 전달하면 Progressive Enhancement가 적용됩니다.",
        code: {
          filename: "app/blog/new/page.tsx",
          language: "tsx",
          snippet: `import { createPost } from '@/app/lib/actions'

export default function Page() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="제목" />
      <textarea name="content" placeholder="내용" />
      <button type="submit">게시</button>
    </form>
  )
}`,
        },
        tips: [
          "Server Function은 UI뿐 아니라 직접 POST 요청으로도 호출 가능하므로, 반드시 서버에서 권한을 검증하세요.",
        ],
      },
    ],
  },

  caching: {
    slug: "caching",
    title: "캐싱",
    description:
      "Next.js의 캐싱 계층과 `use cache` 지시어를 통해 렌더링 성능을 최적화합니다.",
    sections: [
      {
        title: "캐싱 개요",
        content:
          "Next.js는 요청 메모이제이션, Data Cache, Full Route Cache 등 여러 캐싱 계층을 제공합니다. fetch 결과와 렌더링 결과를 재사용해 응답 속도를 높입니다.",
      },
      {
        title: "use cache 지시어",
        content:
          "함수나 컴포넌트에 `'use cache'`를 추가하면 결과를 캐시합니다. 캐시 키와 수명은 `cacheLife`, `cacheTag`로 제어합니다.",
        code: {
          filename: "app/lib/data.ts",
          language: "ts",
          snippet: `'use cache'

export async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  return res.json()
}`,
        },
      },
      {
        title: "캐시 옵트아웃",
        content:
          "`noStore()` 또는 `unstable_noStore()`로 특정 렌더링에서 캐시를 비활성화할 수 있습니다. 실시간 데이터가 필요한 경우 사용합니다.",
        tips: [
          "개발 환경에서는 캐시 동작이 프로덕션과 다를 수 있으니 build 후 확인하세요.",
        ],
      },
    ],
  },

  revalidating: {
    slug: "revalidating",
    title: "재검증",
    description:
      "캐시된 데이터를 갱신하는 revalidatePath, revalidateTag, updateTag API를 설명합니다.",
    sections: [
      {
        title: "언제 재검증하나?",
        content:
          "데이터가 변경된 후에도 캐시된 페이지가 보여질 수 있습니다. Server Action이나 Route Handler에서 재검증 API를 호출해 최신 데이터를 반영합니다.",
      },
      {
        title: "revalidatePath",
        content:
          "특정 경로의 캐시를 무효화합니다. 데이터 변경 후 해당 페이지를 최신 상태로 만듭니다.",
        code: {
          filename: "app/lib/actions.ts",
          language: "ts",
          snippet: `'use server'

import { revalidatePath } from 'next/cache'

export async function updatePost(id: string, data: FormData) {
  // DB 업데이트
  revalidatePath('/blog')
  revalidatePath(\`/blog/\${id}\`)
}`,
        },
      },
      {
        title: "revalidateTag / updateTag",
        content:
          "`cacheTag`로 태그를 지정한 캐시를 선택적으로 무효화합니다. 관련된 여러 fetch 결과를 한 번에 갱신할 때 유용합니다.",
        code: {
          filename: "app/lib/actions.ts",
          language: "ts",
          snippet: `'use server'

import { revalidateTag } from 'next/cache'

export async function refreshProducts() {
  revalidateTag('products')
}`,
        },
      },
    ],
  },

  "error-handling": {
    slug: "error-handling",
    title: "에러 처리",
    description:
      "error.tsx, not-found.tsx, global-error.tsx로 에러와 404를 처리합니다.",
    sections: [
      {
        title: "error.tsx — 에러 바운더리",
        content:
          "라우트 세그먼트에 `error.tsx`를 추가하면 해당 세그먼트의 런타임 에러를 격리합니다. Client Component여야 합니다.",
        code: {
          filename: "app/dashboard/error.tsx",
          language: "tsx",
          snippet: `'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  )
}`,
        },
      },
      {
        title: "not-found.tsx — 404",
        content:
          "`notFound()` 함수를 호출하거나 존재하지 않는 라우트에 접근하면 `not-found.tsx` UI가 표시됩니다.",
        code: {
          filename: "app/blog/[slug]/page.tsx",
          language: "tsx",
          snippet: `import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return <article>{post.title}</article>
}`,
        },
      },
    ],
  },

  css: {
    slug: "css",
    title: "CSS 스타일링",
    description:
      "Tailwind CSS, CSS Modules, Global CSS 등 Next.js에서 지원하는 스타일링 방법입니다.",
    sections: [
      {
        title: "Global CSS",
        content:
          "`app/globals.css`에 전역 스타일을 정의하고 root layout에서 import합니다. Tailwind CSS v4는 `@import \"tailwindcss\"` 한 줄로 설정됩니다.",
        code: {
          filename: "app/globals.css",
          language: "css",
          snippet: `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}`,
        },
      },
      {
        title: "CSS Modules",
        content:
          "`.module.css` 파일을 import하면 클래스명이 자동으로 스코프됩니다. 컴포넌트 단위 스타일에 적합합니다.",
        code: {
          filename: "app/ui/button.module.css + button.tsx",
          language: "tsx",
          snippet: `import styles from './button.module.css'

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.primary}>{children}</button>
}`,
        },
      },
      {
        title: "Tailwind CSS",
        content:
          "create-next-app 기본 템플릿에 포함됩니다. 유틸리티 클래스로 빠르게 UI를 구성할 수 있습니다.",
      },
    ],
  },

  images: {
    slug: "images",
    title: "이미지 최적화",
    description:
      "`next/image` 컴포넌트로 이미지 lazy loading, 리사이징, WebP 변환을 자동 처리합니다.",
    sections: [
      {
        title: "Image 컴포넌트",
        content:
          "`<img>` 대신 `next/image`를 사용하면 자동 최적화, CLS 방지, lazy loading을 적용합니다.",
        code: {
          filename: "app/page.tsx",
          language: "tsx",
          snippet: `import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="히어로 이미지"
      width={800}
      height={400}
      priority
    />
  )
}`,
        },
        tips: [
          "LCP 이미지는 `priority` prop을 추가하세요.",
          "외부 이미지는 `next.config.ts`에 domains 또는 remotePatterns 설정이 필요합니다.",
        ],
      },
      {
        title: "public 폴더",
        content:
          "`public/` 폴더의 파일은 `/` 경로로 제공됩니다. `public/logo.png` → `/logo.png`",
      },
    ],
  },

  fonts: {
    slug: "fonts",
    title: "폰트",
    description:
      "`next/font`로 Google Fonts와 로컬 폰트를 최적화하여 로드합니다.",
    sections: [
      {
        title: "Google Fonts",
        content:
          "빌드 시 폰트 파일을 다운로드해 self-hosting합니다. layout shift 없이 폰트를 적용합니다.",
        code: {
          filename: "app/layout.tsx",
          language: "tsx",
          snippet: `import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  )
}`,
        },
      },
      {
        title: "로컬 폰트",
        content:
          "`next/font/local`로 프로젝트 내 폰트 파일을 불러올 수 있습니다.",
        code: {
          filename: "app/layout.tsx",
          language: "tsx",
          snippet: `import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})`,
        },
      },
    ],
  },

  metadata: {
    slug: "metadata",
    title: "메타데이터 & OG",
    description:
      "SEO와 소셜 공유를 위한 메타데이터, Open Graph 이미지를 설정합니다.",
    sections: [
      {
        title: "정적 메타데이터",
        content:
          "layout 또는 page에서 `metadata` 객체를 export하면 `<head>` 태그가 자동 생성됩니다.",
        code: {
          filename: "app/layout.tsx",
          language: "tsx",
          snippet: `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: '앱 설명',
  openGraph: {
    title: 'My App',
    description: '앱 설명',
    url: 'https://example.com',
  },
}`,
        },
      },
      {
        title: "동적 메타데이터",
        content:
          "`generateMetadata` 함수로 페이지별 메타데이터를 동적으로 생성합니다.",
        code: {
          filename: "app/blog/[slug]/page.tsx",
          language: "tsx",
          snippet: `import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.excerpt }
}`,
        },
      },
      {
        title: "OG 이미지",
        content:
          "`opengraph-image.tsx` 파일로 동적 OG 이미지를 생성하거나, `public/og.png` 같은 정적 파일을 사용할 수 있습니다.",
      },
    ],
  },

  "route-handlers": {
    slug: "route-handlers",
    title: "Route Handlers",
    description:
      "App Router에서 REST API 엔드포인트를 `route.ts` 파일로 정의합니다.",
    sections: [
      {
        title: "기본 구조",
        content:
          "`app/api/` 아래 `route.ts`를 만들고 HTTP 메서드별 함수를 export합니다.",
        code: {
          filename: "app/api/posts/route.ts",
          language: "ts",
          snippet: `export async function GET() {
  const posts = await getPosts()
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = await createPost(body)
  return Response.json(post, { status: 201 })
}`,
        },
      },
      {
        title: "동적 Route Handler",
        content:
          "`app/api/posts/[id]/route.ts`처럼 동적 세그먼트를 사용할 수 있습니다.",
        code: {
          filename: "app/api/posts/[id]/route.ts",
          language: "ts",
          snippet: `export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}`,
        },
        tips: [
          "Route Handler는 Server Component와 같은 캐싱 규칙을 따릅니다.",
          "웹훅, REST API, form action 대체 등에 활용합니다.",
        ],
      },
    ],
  },

  deploying: {
    slug: "deploying",
    title: "배포",
    description:
      "Next.js 앱을 Vercel, Node.js 서버, Docker 등 다양한 환경에 배포하는 방법입니다.",
    sections: [
      {
        title: "Vercel 배포 (권장)",
        content:
          "Next.js를 만든 Vercel에 Git 저장소를 연결하면 자동 빌드·배포됩니다. Preview Deployment로 PR마다 미리보기 URL이 생성됩니다.",
        code: {
          filename: "터미널",
          language: "bash",
          snippet: `npm run build
npm run start`,
        },
      },
      {
        title: "Node.js 서버",
        content:
          "`npm run build` 후 `npm run start`로 Node.js 서버를 실행합니다. `output: 'standalone'` 설정으로 Docker 이미지 크기를 줄일 수 있습니다.",
        code: {
          filename: "next.config.ts",
          language: "ts",
          snippet: `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig`,
        },
      },
      {
        title: "환경 변수",
        content:
          "`.env.production` 또는 배포 플랫폼의 환경 변수 설정에서 `NEXT_PUBLIC_` 접두사가 없는 변수는 서버 전용입니다. 클라이언트에 노출할 값만 `NEXT_PUBLIC_`을 사용하세요.",
        tips: [
          "배포 전 `npm run build`로 로컬에서 빌드 오류를 확인하세요.",
        ],
      },
    ],
  },
};

export function getFeature(slug: string): FeatureContent | undefined {
  return features[slug];
}

export function getAllFeatures(): FeatureContent[] {
  return Object.values(features);
}
