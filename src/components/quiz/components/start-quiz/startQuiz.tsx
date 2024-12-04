import { FC } from "react";
import timerManager from "../timer/timer";
import { useQuizObject } from "../../../../context/quizContext";

type props = {
	name: string | undefined;
	changeTime: () => void;
}

const StartQuiz:FC<props> = ( {name, changeTime} ) => {

	const {
		setQuizField,
		saveQuizObject,
	} = useQuizObject();

	const start = () => {
		timerManager.subscribe(changeTime, name !== undefined ? name : '');
		setQuizField({isStarted: true, isLocked: false});
		saveQuizObject(name);
	}

	return (
		<div>
			<button onClick={() => start()}>start quiz</button>
		</div>
	)
}

export default StartQuiz;