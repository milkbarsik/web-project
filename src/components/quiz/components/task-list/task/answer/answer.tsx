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
			style={{ boxShadow: wasRestarted && result !== "..."
				? isActive === answer
					? type === "right_answer"
						? "0 0 20px 10px rgb(88, 255, 163)" // цвет для правильного ответа, если выбран
						: "0 0 20px 10px rgb(255, 87, 87)" // цвет для неправильного ответа, если выбран
					: type === "right_answer"
					? "0 0 20px 10px rgb(88, 255, 163)" // цвет для правильного ответа, если НЕ выбран
					: "none" // цвет для остальных
				: isActive === answer
				? type === "right_answer"
					? "0 0 20px 10px rgb(133, 247, 255)" // цвет для правильного ответа, если выбран
					: "0 0 20px 10px rgb(133, 247, 255)" // цвет для неправильного ответа, если выбран
				: "none", // цвет для остальных
			}}
			className={styles.wrapper}
			onClick={() => {saveAnswer(answer)}}
			disabled={isLocked}
		>
			<video
				className={styles.video}
				muted
				autoPlay
				controls={false}
				loop
				preload="auto"
				src={`http://91.197.96.178/${answer}`}>
			</video>
		</button>
	)
}

export default Answer;

// "rgb(255, 87, 87)" "rgb(88, 255, 163)"