import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreviewClient from "./NotePreview.client";

interface NotePreviewProps {
  params: Promise<{
    id: string;
  }>;
}
const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Notes", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData<Note>(["Notes", id]);

  if (!note) return null;

  return <NotePreviewClient note={note} />;
};

export default NotePreview;
