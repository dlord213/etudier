import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import LoginSheet from "@/sheets/LoginSheet";
import RegisterSheet from "@/sheets/RegisterSheet";
import TaskSheet from "@/sheets/TaskSheet";
import TaskSortSheet from "@/sheets/TasksSortSheet";
import NoteSortSheet from "@/sheets/NoteSortSheet";
import StudyFocusModeCompletedSheet from "@/sheets/StudyFocusModeCompletedSheet";
import BreakFocusModeCompletedSheet from "@/sheets/BreakFocusModeCompletedSheet";
import DictionarySheet from "@/sheets/DictionarySheet";
import HolidaySheet from "@/sheets/HolidaySheet";

registerSheet("login-sheet", LoginSheet);
registerSheet("register-sheet", RegisterSheet);
registerSheet("task-sheet", TaskSheet);
registerSheet("task-sort-sheet", TaskSortSheet);
registerSheet("note-sort-sheet", NoteSortSheet);
registerSheet("focus-mode-study-completed-sheet", StudyFocusModeCompletedSheet);
registerSheet("focus-mode-break-completed-sheet", BreakFocusModeCompletedSheet);
registerSheet("hub-dictionary-sheet", DictionarySheet);
registerSheet("hub-holiday-sheet", HolidaySheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "login-sheet": SheetDefinition;
    "register-sheet": SheetDefinition;
    "task-sheet": SheetDefinition;
    "task-sort-sheet": SheetDefinition;
    "note-sort-sheet": SheetDefinition;
    "focus-mode-study-completed-sheet": SheetDefinition;
    "focus-mode-break-completed-sheet": SheetDefinition;
    "hub-dictionary-sheet": SheetDefinition;
    "hub-holiday-sheet": SheetDefinition;
  }
}

export {};
