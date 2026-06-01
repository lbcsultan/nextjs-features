"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Note } from "@/lib/notes";
import { addNote, removeNote } from "@/lib/note-actions";

type NotesPlaygroundProps = {
  initialNotes: Note[];
};

type ApiLog = {
  id: number;
  method: string;
  url: string;
  status: number;
  body: string;
};

export function NotesPlayground({ initialNotes }: NotesPlaygroundProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [apiText, setApiText] = useState("");
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [healthResult, setHealthResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  function pushLog(method: string, url: string, status: number, body: unknown) {
    setApiLogs((prev) => [
      {
        id: Date.now(),
        method,
        url,
        status,
        body: JSON.stringify(body, null, 2),
      },
      ...prev.slice(0, 4),
    ]);
  }

  async function refreshNotesFromApi() {
    const response = await fetch("/api/notes");
    const data = await response.json();
    pushLog("GET", "/api/notes", response.status, data);

    if (response.ok) {
      setNotes(data.notes);
    }
  }

  async function createNoteViaApi() {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: apiText }),
    });
    const data = await response.json();
    pushLog("POST", "/api/notes", response.status, data);

    if (response.ok) {
      setApiText("");
      await refreshNotesFromApi();
    }
  }

  async function deleteNoteViaApi(id: string) {
    const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    const data = await response.json();
    pushLog("DELETE", `/api/notes/${id}`, response.status, data);

    if (response.ok) {
      await refreshNotesFromApi();
    }
  }

  async function checkHealth() {
    const response = await fetch("/api/health");
    const data = await response.json();
    pushLog("GET", "/api/health", response.status, data);
    setHealthResult(JSON.stringify(data, null, 2));
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          1. Health Check API
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          가장 단순한 백엔드 엔드포인트입니다.{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
            GET /api/health
          </code>
          로 서버 상태를 확인할 수 있습니다.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={checkHealth}
            className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Health Check 호출
          </button>
          {healthResult && (
            <pre className="w-full overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs text-emerald-300">
              {healthResult}
            </pre>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          2. Server Action으로 메모 추가
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          폼 제출을 서버 함수로 처리합니다. JavaScript 없이도 동작하며, 제출 후 페이지가
          갱신됩니다.
        </p>
        <form
          action={(formData) => {
            startTransition(async () => {
              await addNote(formData);
              router.refresh();
            });
          }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            name="text"
            type="text"
            placeholder="Server Action으로 추가할 메모"
            className="h-10 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {isPending ? "저장 중..." : "Server Action 추가"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          3. Route Handler (REST API)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          fetch로{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
            /api/notes
          </code>
          를 호출해 메모를 조회·생성·삭제합니다.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={apiText}
            onChange={(event) => setApiText(event.target.value)}
            type="text"
            placeholder="API로 추가할 메모"
            className="h-10 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <button
            type="button"
            onClick={createNoteViaApi}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            POST /api/notes
          </button>
          <button
            type="button"
            onClick={refreshNotesFromApi}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            GET /api/notes
          </button>
        </div>

        {apiLogs.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              최근 API 응답
            </p>
            {apiLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <p className="font-mono text-xs text-zinc-500">
                  {log.method} {log.url} → {log.status}
                </p>
                <pre className="mt-2 overflow-x-auto font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  {log.body}
                </pre>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          메모 목록
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          서버 메모리에 저장됩니다. 개발 서버를 재시작하면 초기화됩니다.
        </p>

        {notes.length === 0 ? (
          <p className="mt-6 rounded-lg border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
            아직 메모가 없습니다. 위에서 하나 추가해 보세요.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800"
              >
                <div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{note.text}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {note.id} · {new Date(note.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(async () => {
                        const formData = new FormData();
                        formData.set("id", note.id);
                        await removeNote(formData);
                        router.refresh();
                      });
                    }}
                    className="inline-flex h-9 items-center rounded-lg border border-zinc-200 px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    Server Action 삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNoteViaApi(note.id)}
                    className="inline-flex h-9 items-center rounded-lg border border-red-200 px-3 text-xs font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-950/30"
                  >
                    API 삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
