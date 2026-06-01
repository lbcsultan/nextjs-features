import Link from "next/link";
import { CodeBlock } from "./code-block";
import type { FeatureContent } from "@/lib/types";
import { getFeature } from "@/lib/content";
import { getAdjacentSlugs, getNavItem } from "@/lib/navigation";

type FeaturePageProps = {
  feature: FeatureContent;
};

export function FeaturePage({ feature }: FeaturePageProps) {
  const navInfo = getNavItem(feature.slug);
  const { prev, next } = getAdjacentSlugs(feature.slug);

  return (
    <article>
      {navInfo && (
        <p className="mb-2 text-sm font-medium text-zinc-500">
          {navInfo.category}
        </p>
      )}

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {feature.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {feature.description}
      </p>

      <div className="mt-10 space-y-10">
        {feature.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h2>
            <div className="mt-3 whitespace-pre-line text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {section.content}
            </div>

            {section.code && (
              <CodeBlock
                filename={section.code.filename}
                language={section.code.language}
                snippet={section.code.snippet}
              />
            )}

            {section.tips && section.tips.length > 0 && (
              <ul className="mt-4 space-y-2">
                {section.tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200"
                  >
                    <span className="shrink-0 font-semibold">Tip</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {feature.relatedLinks && feature.relatedLinks.length > 0 && (
        <div className="mt-10 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            관련 링크
          </h3>
          <ul className="mt-3 space-y-2">
            {feature.relatedLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        {prev ? (
          <Link
            href={`/docs/${prev}`}
            className="group flex flex-col text-left"
          >
            <span className="text-xs text-zinc-500">이전</span>
            <span className="text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
              {getFeature(prev)?.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/docs/${next}`}
            className="group flex flex-col text-right"
          >
            <span className="text-xs text-zinc-500">다음</span>
            <span className="text-sm font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
              {getFeature(next)?.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
