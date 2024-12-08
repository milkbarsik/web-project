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
			startTime: 180,
			time: 180,
			wasSent: false,
			isStarted: false,
			isLocked: true,
			wasRestarted: false,
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