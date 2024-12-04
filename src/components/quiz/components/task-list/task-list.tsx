import { FC, useEffect } from "react";
import Task from "./task";
import { useQuizObject } from "../../../../context/quizContext";
import { useFetch } from "../../../../api/useFetch";
import QuizApi from "../../../../api/main/main";

type props = {
	name: string | undefined;
}

const TaskList:FC<props> = ( { name } ) => {

	const {
		id,
		questions,
		setQuizField,
		saveQuizObject
	} = useQuizObject();

	const {fetching, isLoading, error} = useFetch(async () => {
		const res = await QuizApi.getQuestions(Number(id));
		setQuizField({questions: res});
		saveQuizObject(name);
	});

	useEffect(() => {
		const currentQuizState = useQuizObject.getState();
		if (!Array.isArray(currentQuizState.questions) || currentQuizState.questions.length === 0) {
			fetching();
		}
	}, [])

	const renderQuestions = () => {
		return questions.map((el) => {
			console.log(el);
			return <Task key={el.id} data={el} quizName={name} />
		})
	}

	return (
		<div>
			{isLoading && <p>Loading...</p>}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}
				{!isLoading && !error && questions.length > 0 ? (
					renderQuestions()
				) : (
					!isLoading && !error && <p>No quizzes available</p>
				)}
				
		</div>
	)
}

export default TaskList;