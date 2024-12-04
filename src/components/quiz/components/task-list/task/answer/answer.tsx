import { FC } from "react";
import styles from './answer.module.css';
import { useQuizObject } from "../../../../../../context/quizContext";

type props = {
	type: string;
	answer: string | number;
	saveAnswer: (param: string | number) => void;
	isActive: string | number;
}

const Answer:FC<props> = ( {type, answer, saveAnswer, isActive} ) => {

	const {
		isLocked,
		wasRestarted,
		result
	} = useQuizObject();

	return (
		<button
			style={{ backgroundColor: wasRestarted && result !== "..."
				? isActive === answer
					? type === "right_answer"
						? "rgb(88, 255, 163)" // цвет для правильного ответа, если выбран
						: "rgb(255, 87, 87)" // цвет для неправильного ответа, если выбран
					: type === "right_answer"
					? "rgb(88, 255, 163)" // цвет для правильного ответа, если НЕ выбран
					: "transparent" // цвет для остальных
				: isActive === answer
				? type === "right_answer"
					? "rgb(88, 255, 163)" // цвет для правильного ответа, если выбран
					: "rgb(88, 255, 163)" // цвет для неправильного ответа, если выбран
				: "transparent", // цвет для остальных
			}}
			className={styles.wrapper}
			onClick={() => {saveAnswer(answer)}}
			disabled={isLocked}
		>
			{answer}
		</button>
	)
}

export default Answer;

// "rgb(255, 87, 87)" "rgb(88, 255, 163)"