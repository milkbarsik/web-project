import { FC, useEffect, useState  } from "react";
import styles from './task.module.css';
import Answer from "./answer";

type props = {
  data: {
    [key: string]: string | number;
  };
	quizName: string | undefined;
	isLocked: boolean;
};

const Task:FC<props> = ( {data, quizName, isLocked} ) => {

	const rawQuizId =	sessionStorage.getItem(`${quizName}`);
	const quizId = rawQuizId !== null ? JSON.parse(rawQuizId).id : '';
	const [chooseAnswer, setAnswer] = useState<string | number>('');

	const saveAnswer = (answer: string | number) => {
		setAnswer(answer);
		const quizAnswers = sessionStorage.getItem(`quizAnswers${quizId}`);
		if(quizAnswers !== null) {
			const correctQuizAnswers = JSON.parse(quizAnswers);
			const newQuizAnswers = {
				...correctQuizAnswers,
				[data.id]: answer,
			}
			sessionStorage.setItem(`quizAnswers${quizId}`, JSON.stringify(newQuizAnswers));
		} else {
			sessionStorage.setItem(`quizAnswers${quizId}`, JSON.stringify({
				[data.id]: answer,
			}))
		}
		console.log(sessionStorage.getItem(`quizAnswers${quizId}`));
	}

	const renderAnswers = ( data: {[key: string]: string | number}) => {
		return Object.entries(data).splice(2).filter((el) => el[1] !== null).map((el) => {
			return <Answer key={el[0]} answer={el[1]} saveAnswer={saveAnswer} isActive={chooseAnswer} isLocked={isLocked} />
		})
	}

	useEffect(() => {
		const quizAnswers = sessionStorage.getItem(`quizAnswers${quizId}`);
		if(quizAnswers !== null) {
			const correctQuizAnswers = JSON.parse(quizAnswers);
			if(correctQuizAnswers[data.id]) {
				setAnswer(correctQuizAnswers[data.id])
			}
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<h3>{data.content}</h3>
			<div className={styles.answers}>
				{renderAnswers(data)}
			</div>
		</div>
	)
}

export default Task;