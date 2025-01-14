import { EditNoteProps } from "../config";
import { useNote } from "../hooks/UseNote";
import NotesForm from "./NotesForm";

export default function EditNotes({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Notes</h1>
      <NotesForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
