import type { DehydratedState } from "@tanstack/react-query";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

export const dynamic = "force-dynamic";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState: DehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
