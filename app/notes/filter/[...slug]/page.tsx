import type { DehydratedState } from "@tanstack/react-query";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const { slug } = await params;
  const filter = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", filter, 1],
    queryFn: () =>
      fetchNotes({ query: "", page: 1, ...(filter !== "All" && { filter }) }),
  });

  const dehydratedState: DehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
};

export default NotesPage;
