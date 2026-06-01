import { createNote, listNotes } from "@/lib/notes";

export async function GET() {
  return Response.json({ notes: listNotes() });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON 형식의 body가 필요합니다." }, { status: 400 });
  }

  const text =
    typeof body === "object" &&
    body !== null &&
    "text" in body &&
    typeof body.text === "string"
      ? body.text
      : "";

  if (!text.trim()) {
    return Response.json({ error: "text 필드는 필수입니다." }, { status: 400 });
  }

  const note = createNote(text);
  return Response.json({ note }, { status: 201 });
}
