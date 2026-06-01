export type Note = {
  id: string;
  text: string;
  createdAt: string;
};

const notes: Note[] = [
  {
    id: "1",
    text: "Next.js Route Handler로 만든 첫 번째 메모입니다.",
    createdAt: new Date().toISOString(),
  },
];

export function listNotes(): Note[] {
  return [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getNote(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function createNote(text: string): Note {
  const note: Note = {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  notes.unshift(note);
  return note;
}

export function deleteNote(id: string): boolean {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return false;

  notes.splice(index, 1);
  return true;
}
