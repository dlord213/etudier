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
import ThesaurusSheet from "@/sheets/ThesaurusSheet";
import FlashCardsSheet from "@/sheets/FlashCardsSheet";
import FlashcardResourcesSheet from "@/sheets/FlashcardResourcesSheet";
import ResourceUploadFileSheet from "@/sheets/ResourceUploadFileSheet";
import PremiumUpgradeSheet from "@/sheets/PremiumUpgradeSheet";
import PremiumPaymentSheet from "@/sheets/PremiumPaymentSheet";
import PremiumScreenshotUploadSheet from "@/sheets/PremiumScreenshotUpload";

registerSheet("login-sheet", LoginSheet);
registerSheet("register-sheet", RegisterSheet);
registerSheet("task-sheet", TaskSheet);
registerSheet("task-sort-sheet", TaskSortSheet);
registerSheet("note-sort-sheet", NoteSortSheet);
registerSheet("focus-mode-study-completed-sheet", StudyFocusModeCompletedSheet);
registerSheet("focus-mode-break-completed-sheet", BreakFocusModeCompletedSheet);
registerSheet("hub-dictionary-sheet", DictionarySheet);
registerSheet("hub-holiday-sheet", HolidaySheet);
registerSheet("hub-thesaurus-sheet", ThesaurusSheet);
registerSheet("hub-flashcards-sheet", FlashCardsSheet);
registerSheet("hub-flashcards-resources-sheet", FlashcardResourcesSheet);
registerSheet("hub-resource-upload-file-sheet", ResourceUploadFileSheet);
registerSheet("premium-upgrade-sheet", PremiumUpgradeSheet);
registerSheet("premium-payment-sheet", PremiumPaymentSheet);
registerSheet("premium-screenshot-upload-sheet", PremiumScreenshotUploadSheet);

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
    "hub-thesaurus-sheet": SheetDefinition;
    "hub-flashcards-sheet": SheetDefinition;
    "hub-flashcards-resources-sheet": SheetDefinition<{
      payload: {
        resources: any;
      };
    }>;
    "hub-resource-upload-file-sheet": SheetDefinition;
    "premium-upgrade-sheet": SheetDefinition;
    "premium-payment-sheet": SheetDefinition;
    "premium-screenshot-upload-sheet": SheetDefinition;
  }
}

export {};
