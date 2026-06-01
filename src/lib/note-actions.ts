"use server";

import { revalidatePath } from "next/cache";
import { createNote, deleteNote } from "@/lib/notes";

export async function addNote(formData: FormData) {
  const text = formData.get("text");

  if (typeof text !== "string" || !text.trim()) {
    return { ok: false as const, error: "메모 내용을 입력해 주세요." };
  }

  createNote(text);
  revalidatePath("/playground");

  return { ok: true as const };
}

export async function removeNote(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return { ok: false as const, error: "잘못된 요청입니다." };
  }

  const deleted = deleteNote(id);
  revalidatePath("/playground");

  if (!deleted) {
    return { ok: false as const, error: "메모를 찾을 수 없습니다." };
  }

  return { ok: true as const };
}
