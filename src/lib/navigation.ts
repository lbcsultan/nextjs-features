import type { NavCategory } from "./types";

export const navigation: NavCategory[] = [
  {
    title: "시작하기",
    items: [
      { slug: "introduction", title: "Next.js 소개" },
      { slug: "project-structure", title: "프로젝트 구조" },
      { slug: "installation", title: "설치 및 실행" },
    ],
  },
  {
    title: "라우팅",
    items: [
      { slug: "layouts-and-pages", title: "레이아웃과 페이지" },
      { slug: "linking-and-navigating", title: "링크와 네비게이션" },
    ],
  },
  {
    title: "렌더링",
    items: [
      { slug: "server-client-components", title: "Server / Client Components" },
      { slug: "fetching-data", title: "데이터 페칭" },
      { slug: "caching", title: "캐싱" },
      { slug: "revalidating", title: "재검증" },
    ],
  },
  {
    title: "데이터",
    items: [
      { slug: "mutating-data", title: "데이터 변경 (Server Actions)" },
      { slug: "route-handlers", title: "Route Handlers" },
    ],
  },
  {
    title: "UI & 스타일",
    items: [
      { slug: "css", title: "CSS 스타일링" },
      { slug: "images", title: "이미지 최적화" },
      { slug: "fonts", title: "폰트" },
      { slug: "metadata", title: "메타데이터 & OG" },
    ],
  },
  {
    title: "운영",
    items: [
      { slug: "error-handling", title: "에러 처리" },
      { slug: "deploying", title: "배포" },
    ],
  },
];

export const allSlugs = navigation.flatMap((category) =>
  category.items.map((item) => item.slug),
);

export function getNavItem(slug: string) {
  for (const category of navigation) {
    const item = category.items.find((entry) => entry.slug === slug);
    if (item) {
      return { category: category.title, item };
    }
  }
  return null;
}

export function getAdjacentSlugs(slug: string) {
  const slugs = allSlugs;
  const index = slugs.indexOf(slug);
  return {
    prev: index > 0 ? slugs[index - 1] : null,
    next: index < slugs.length - 1 ? slugs[index + 1] : null,
  };
}
