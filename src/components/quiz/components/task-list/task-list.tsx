import { FC } from "react";
import Task from "./task";

type props = {
	name: string | undefined;
	isLocked: boolean;
	questions: Array<Record<string, string | number>>;
	isLoading: boolean;
	error: string | null;
}

const TaskList:FC<props> = ( { name, isLocked, questions, isLoading, error} ) => {


	const renderQuestions = () => {
		return questions.map((el) => {
			return <Task key={el.id} data={el} quizName={name} isLocked={isLocked} />
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