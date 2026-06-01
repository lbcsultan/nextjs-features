"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      {navigation.map((category) => (
        <div key={category.title}>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {category.title}
          </h3>
          <ul className="space-y-0.5">
            {category.items.map((item) => {
              const href = `/docs/${item.slug}`;
              const isActive = pathname === href;

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-zinc-900 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
