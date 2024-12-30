import { useEffect, useRef } from 'react';
import styles from './quiz.module.css';
import { useParams } from 'react-router-dom';
import TaskList from './components/task-list';
import SendAsnwers from './components/sendAnswers';
import StartQuiz from './components/start-quiz';
import { useQuizObject } from '../../context/quizContext';

const Quiz = () => {
  const { name } = useParams<{ name: string }>();

  const { isStarted, timeNow, setTimeNow, setQuizField, loadQuizObject, saveQuizObject } = useQuizObject();

  const timerRef = useRef<any>(null);

  const changeTime = () => {
    loadQuizObject(name);
    const currentQuizState = useQuizObject.getState();

    timerRef.current = setInterval(() => {
      const remainingTime = currentQuizState.timeQuizEnd - Math.floor(Date.now() / 1000);
      setTimeNow(remainingTime);
      saveQuizObject(name);

      if (remainingTime <= 0) {
        clearInterval(timerRef.current!);
        setQuizField({ needSend: true });
      }
    }, 1000);
  };

  useEffect(() => {
    if (name) {
      loadQuizObject(name);
      const currentQuizState = useQuizObject.getState();

      if (currentQuizState.isStarted && !currentQuizState.wasSent && currentQuizState.timeNow > 0) {
        changeTime();
      }

      if (currentQuizState.timeNow === 0 && !currentQuizState.wasSent) {
        setQuizField({ needSend: true });
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        saveQuizObject(name);
        setTimeNow(-1);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>{timeNow === -1 ? '' : timeNow}s</span>
      <header className={styles.header}>{`Quiz: ${name}`}</header>

      <main>
        {!isStarted && <StartQuiz name={name} changeTime={changeTime} />}

        {isStarted && (
          <div className={styles.content}>
            <TaskList name={name} />
            <SendAsnwers name={name} timer={timerRef.current} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
