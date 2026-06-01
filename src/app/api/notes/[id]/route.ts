import { deleteNote, getNote } from "@/lib/notes";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const note = getNote(id);

  if (!note) {
    return Response.json({ error: "메모를 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json({ note });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const deleted = deleteNote(id);

  if (!deleted) {
    return Response.json({ error: "메모를 찾을 수 없습니다." }, { status: 404 });
  }

  return Response.json({ ok: true });
}
