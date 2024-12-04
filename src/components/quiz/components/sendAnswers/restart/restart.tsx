import { FC } from "react";

import { useQuizObject } from "../../../../../context/quizContext";

type props = {
	name: string | undefined;
}

const Restart:FC<props> = ({ name }) => {

	const {
		id,
		wasRestarted,
		setQuizField,
		saveQuizObject,
		startTime,
	} = useQuizObject();

	const restart = () => {
		setQuizField({
			result: "...",
			time: startTime,
			wasSent: false,
			isStarted: false,
			isLocked: true,
			wasRestarted: true,
		})
		saveQuizObject(name);
		sessionStorage.removeItem(`quizAnswers${id}`);
	}

	return (
		<div>
			{!wasRestarted && <button onClick={
				() => {restart()}
				}>restart</button>}
		</div>
	)
}

export default Restart;