import Link from "next/link";

type CodeBlockProps = {
  filename: string;
  language: string;
  snippet: string;
};

export function CodeBlock({ filename, language, snippet }: CodeBlockProps) {
  return (
    <figure className="my-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      <figcaption className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs text-zinc-400">
        <span>{filename}</span>
        <span className="font-mono uppercase">{language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-zinc-100">{snippet}</code>
      </pre>
    </figure>
  );
}
