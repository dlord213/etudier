import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface QuestionsInterface {
  answer: string;
  choices: string[];
  question: string;
}

interface QuizStoreInterface {
  id: string;
  title: string;
  description: string;
  questions: QuestionsInterface[];
  setID: (val: string) => void;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setQuestions: (data: QuestionsInterface[]) => void;
  resetQuiz: () => void;
}

const useQuizStore = create<QuizStoreInterface>()(
  immer((set, get) => ({
    id: "",
    title: "",
    description: "",
    questions: [],
    setID: (val: string) => {
      set({ id: val });
    },
    setTitle: (val: string) => {
      set({ title: val });
    },
    setDescription: (val: string) => {
      set({ description: val });
    },
    setQuestions: (data: QuestionsInterface[]) => {
      set({ questions: data });
    },
    resetQuiz: () => {
      set({ id: "", title: "", description: "", questions: [] });
    },
  }))
);

export default useQuizStore;
