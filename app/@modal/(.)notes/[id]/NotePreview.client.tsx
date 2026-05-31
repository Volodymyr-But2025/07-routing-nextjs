"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  note: Note;
}

const NotePreviewClient = ({ note }: NotePreviewClientProps) => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Modal onClose={handleCloseModal}>
      <div className={css.container}>
        <button
          onClick={handleCloseModal}
          style={{ position: "absolute", top: "10px", right: "10px" }}
          type="button"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
