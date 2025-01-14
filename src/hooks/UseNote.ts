import { useOutletContext } from "react-router-dom";
import { Note } from "../config";

export function useNote() {
  return useOutletContext<Note>();
}
