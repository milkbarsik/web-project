import { FC } from "react";
import { useQuizObject } from "../../../../context/quizContext";

type props = {
	name: string | undefined;
	changeTime: () => void;
}

const StartQuiz:FC<props> = ( {name, changeTime} ) => {

	const {
		setQuizField,
		saveQuizObject,
		loadQuizObject
	} = useQuizObject();

	const start = () => {
		loadQuizObject(name);
		const currentQuizState = useQuizObject.getState();
		if(currentQuizState.timeQuizEnd === -1) {
			setQuizField({timeQuizEnd: Math.floor(Date.now() / 1000) + currentQuizState.timeForQuiz});
			saveQuizObject(name);
		}
		changeTime();
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