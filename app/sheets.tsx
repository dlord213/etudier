import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import LoginSheet from "@/components/LoginSheet";
import RegisterSheet from "@/components/RegisterSheet";
import TaskSheet from "@/components/TaskSheet";
import TaskSortSheet from "@/components/TasksSortSheet";

registerSheet("login-sheet", LoginSheet);
registerSheet("register-sheet", RegisterSheet);
registerSheet("task-sheet", TaskSheet);
registerSheet("task-sort-sheet", TaskSortSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "login-sheet": SheetDefinition;
    "register-sheet": SheetDefinition;
    "task-sheet": SheetDefinition;
    "task-sort-sheet": SheetDefinition;
  }
}

export {};
