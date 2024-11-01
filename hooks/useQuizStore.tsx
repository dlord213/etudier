import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface QuestionsInterface {
  answer: string;
  choices: string[];
  question: string;
}

interface QuizResourceInterface {
  link: string;
  title: string;
}

interface QuizStoreInterface {
  id: string;
  title: string;
  description: string;
  question: QuestionsInterface;
  questions: QuestionsInterface[];
  resource: QuizResourceInterface;
  resources: QuizResourceInterface[];
  setID: (val: string) => void;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  setQuestions: (data: QuestionsInterface[]) => void;
  setQuestion: (val: string) => void;
  setResourceLink: (val: string) => void;
  setResourceTitle: (val: string) => void;
  appendQuestion: () => void;
  appendChoices: (val: string[]) => void;
  appendResource: () => void;
  setAnswer: (index: number) => void;
  resetQuestion: () => void;
  resetQuestions: () => void;
  resetResource: () => void;
  resetResources: () => void;
}

const useQuizStore = create<QuizStoreInterface>()(
  immer((set, get) => ({
    id: "",
    title: "",
    description: "",
    question: {
      answer: "",
      choices: [],
      question: "",
    },
    questions: [],
    resource: { link: "", title: "" },
    resources: [],
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
    setQuestion: (val: string) => {
      set({ question: { ...get().question, question: val } });
    },
    setResourceLink: (val: string) => {
      set({ resource: { ...get().resource, link: val } });
    },
    setResourceTitle: (val: string) => {
      set({ resource: { ...get().resource, title: val } });
    },
    appendQuestion: () => {
      set({ questions: [...get().questions, get().question] });
      get().resetQuestion();
    },
    appendChoices: (val: string[]) => {
      if (val.some((choice) => choice === "")) {
        return;
      } else {
        set({ question: { ...get().question, choices: val } });
      }
    },
    appendResource: () => {
      set({ resources: [...get().resources, get().resource] });
    },
    setAnswer: (index: number) => {
      set({
        question: { ...get().question, answer: get().question.choices[index] },
      });
    },
    resetQuestion: () => {
      set({
        question: {
          answer: "",
          choices: [],
          question: "",
        },
      });
    },
    resetQuestions: () => {
      set({ id: "", title: "", description: "", questions: [] });
    },
    resetResource: () => {
      set({ resource: { link: "", title: "" } });
    },
    resetResources: () => {
      set({ resources: [] });
    },
  }))
);

export default useQuizStore;
