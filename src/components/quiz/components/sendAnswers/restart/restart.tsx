import { FC } from 'react';

import { useQuizObject } from '../../../../../context/quizContext';

type props = {
  name: string | undefined;
};

const Restart: FC<props> = ({ name }) => {
  const { id, timeForQuiz, wasRestarted, setQuizField, saveQuizObject } = useQuizObject();

  const restart = () => {
    setQuizField({
      result: -1,
      timeNow: timeForQuiz,
      timeQuizEnd: -1,
      wasSent: false,
      isStarted: false,
      isLocked: true,
      needSend: false,
      wasRestarted: true,
    });
    saveQuizObject(name);
    sessionStorage.removeItem(`quizAnswers${id}`);
  };

  return (
    <div>
      {!wasRestarted && (
        <button
          onClick={() => {
            restart();
          }}
        >
          Повторить
        </button>
      )}
    </div>
  );
};

export default Restart;
