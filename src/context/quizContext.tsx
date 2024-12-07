import { create } from "zustand";
import { devtools } from "zustand/middleware";

type QuizState = {
  id: number | null;
  questions: Array<Record<string, string | number>>;
  startTime: number;
  time: number;
  wasSent: boolean;
  isStarted: boolean;
  isLocked: boolean;
	needSend: boolean;
  wasRestarted: boolean;
	result: string | number;
  setTime: (value?: number) => void;
  setQuizField: (field: Partial<QuizState>) => void;
  loadQuizObject: (name: string | undefined) => void;
  saveQuizObject: (name: string | undefined) => void;
  resetQuiz: () => void;
};

export const useQuizObject = create<QuizState>()(
  devtools(
    (set, get) => ({
      id: null,
      questions: [],
      startTime: 180,
      time: 180,
      wasSent: false,
      isStarted: false,
      isLocked: true,
			needSend: false,
      wasRestarted: false,
			result: "...",

      setTime: (value?: number) =>
        set((state) => ({ time: value ? value : state.time - 1 }), false, "setTime"),

      setQuizField: (field) =>
        set((state) => ({ ...state, ...field }), false, "setQuizField"),

      loadQuizObject: (name: string | undefined) => {
        const data = sessionStorage.getItem(`${name}`);
        if (data) {
          const quizObject = JSON.parse(data);
          set(() => ({ ...quizObject }), false, "loadQuizObject");
        }
				return get();
      },

      saveQuizObject: (name: string | undefined) => {
        const quizObject = get();
        sessionStorage.setItem(`${name}`, JSON.stringify(quizObject));
      },

      resetQuiz: () =>
        set(
          () => ({
            id: null,
            questions: [],
            startTime: 0,
            time: 0,
            wasSent: false,
            isStarted: false,
            isLocked: true,
            wasRestarted: false,
          }),
          false,
          "resetQuiz"
        ),
    }),
    { name: "QuizStore" } // Название состояния для отображения в DevTools
  )
);