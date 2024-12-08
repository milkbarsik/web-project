import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './quiz-button.module.css'

type props = {
	path: string;
	name: string;
	id: string;
}

const saveParams = (id: string, name: string) => {
	if(sessionStorage.getItem(`${name}`) == null) {
		const quizObject = {
			id: id,
			questions: {},
			timeForQuiz: 180,
			timeQuizEnd: -1,
			timeNow: 180,
			wasSent: false,
			isStarted: false,
			isLocked: true,
			needSend: false,
			wasRestarted: false,
			result: '...'
		}
		sessionStorage.setItem(`${name}`, JSON.stringify(
			quizObject
		));
	}
}

const QuizButton:FC<props> = ( {name, path, id} ) => {

	return (
		<Link to={path} className={styles.wrapper}>
			<button onClick={() => saveParams(id, name)}>
				{name}
			</button>
		</Link>
	)
}

export default QuizButton;