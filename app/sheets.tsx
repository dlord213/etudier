import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import LoginSheet from "@/components/LoginSheet";
import RegisterSheet from "@/components/RegisterSheet";
import TaskSheet from "@/components/TaskSheet";
import TaskSortSheet from "@/components/TasksSortSheet";
import NoteSortSheet from "@/components/NoteSortSheet";
import StudyFocusModeCompletedSheet from "@/components/StudyFocusModeCompletedSheet";
import BreakFocusModeCompletedSheet from "@/components/BreakFocusModeCompletedSheet";

registerSheet("login-sheet", LoginSheet);
registerSheet("register-sheet", RegisterSheet);
registerSheet("task-sheet", TaskSheet);
registerSheet("task-sort-sheet", TaskSortSheet);
registerSheet("note-sort-sheet", NoteSortSheet);
registerSheet("focus-mode-study-completed-sheet", StudyFocusModeCompletedSheet);
registerSheet("focus-mode-break-completed-sheet", BreakFocusModeCompletedSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "login-sheet": SheetDefinition;
    "register-sheet": SheetDefinition;
    "task-sheet": SheetDefinition;
    "task-sort-sheet": SheetDefinition;
    "note-sort-sheet": SheetDefinition;
    "focus-mode-study-completed-sheet": SheetDefinition;
    "focus-mode-break-completed-sheet": SheetDefinition;
  }
}

export {};
