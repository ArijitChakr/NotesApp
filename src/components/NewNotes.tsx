import { NewNoteProps } from "../config";
import NotesForm from "./NotesForm";

export default function NewNotes({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Notes</h1>
      <NotesForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
