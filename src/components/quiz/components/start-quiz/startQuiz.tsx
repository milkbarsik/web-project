import { FC } from "react";
import timerManager from "../timer/timer";

type props = {
	name: string | undefined;
	quizObject: any;
	setStart: (param: boolean) => void;
	setLocked: (param: boolean) => void;
	changeTime: () => void;
}

const StartQuiz:FC<props> = ( {name, quizObject, setStart, setLocked, changeTime} ) => {

	const start = () => {
		timerManager.subscribe(changeTime, name !== undefined ? name : '');
		setStart(true);
		setLocked(false);
		quizObject.isStarted = true;
		sessionStorage.setItem(`${name}`, JSON.stringify(quizObject));
	}

	return (
		<div>
			<button onClick={() => start()}>start quiz</button>
		</div>
	)
}

export default StartQuiz;