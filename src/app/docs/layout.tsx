import { SiteHeader } from "@/components/site-header";
import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </>
  );
}
