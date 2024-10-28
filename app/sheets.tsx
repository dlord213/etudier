import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import LoginSheet from "@/components/LoginSheet";
import RegisterSheet from "@/components/RegisterSheet";
import TaskSheet from "@/components/TaskSheet";

registerSheet("login-sheet", LoginSheet);
registerSheet("register-sheet", RegisterSheet);
registerSheet("task-sheet", TaskSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "login-sheet": SheetDefinition;
    "register-sheet": SheetDefinition;
    "task-sheet": SheetDefinition;
  }
}

export {};
