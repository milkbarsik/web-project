import { useEffect, useState } from "react";
import styles from './quiz.module.css';
import { useFetch } from "../../api/useFetch";
import QuizApi from "../../api/main/main";
import { useParams } from "react-router-dom";
import Task from "./components";


const Quiz = () => {

	const { id, name } = useParams<{id: string, name: string}>();

	const [questions, setQuestions] = useState<Array<Record<string, string | number>>>([]);

	const {fetching, isLoading, error} = useFetch(async () => {
		const data = await QuizApi.getQuestions(Number(id));
		setQuestions(data);
	});

	useEffect(() => {
			fetching();
	}, []);

	if(!isLoading) console.log(questions);

	const renderQuestions = () => {
		return questions.map((el) => {
			return <Task key={el.id} data={el} />
		})
	}

	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h2>
					{`Quiz: ${name}`}
				</h2>
			</header>
			<main>
			{isLoading && <p>Loading...</p>}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}
				{!isLoading && !error && questions.length > 0 ? (
					renderQuestions()
				) : (
					!isLoading && !error && <p>No quizzes available</p>
				)}
			</main>
		</div>
	)
}

export default Quiz;