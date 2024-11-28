import { FC } from "react";
import styles from './answer.module.css';

type props = {
	answer: string | number;
	saveAnswer: (param: string | number) => void;
	isActive: string | number;
	wasSent: boolean;
}

const Answer:FC<props> = ( {answer, saveAnswer, isActive, wasSent} ) => {

	return (
		<button
			style={{backgroundColor: answer === isActive ? "rgb(125, 255, 183)" : "transparent"}}
			className={styles.wrapper}
			onClick={() => {saveAnswer(answer)}}
			disabled={wasSent}
		>
			{answer}
		</button>
	)
}

export default Answer;