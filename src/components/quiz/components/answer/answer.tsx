import { FC } from "react";
import styles from './answer.module.css';

type props = {
	answer: string | number;
	saveAnswer: (param: string | number) => void;
	isActive: string | number;
}

const Answer:FC<props> = ( {answer, saveAnswer, isActive} ) => {

	return (
		<button
			style={{backgroundColor: answer === isActive ? "rgb(125, 255, 183)" : "transparent"}}
			className={styles.wrapper}
			onClick={() => {saveAnswer(answer)}}
		>
			{answer}
		</button>
	)
}

export default Answer;