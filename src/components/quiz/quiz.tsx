import { useEffect, useState } from "react";
import styles from './quiz.module.css';
import { useFetch } from "../../api/useFetch";
import QuizApi from "../../api/main/main";
import { useParams } from "react-router-dom";
import Task from "./components/task";


const Quiz = () => {

	const { name } = useParams<{ name: string}>();
	const id = sessionStorage.getItem(`${name}`);
	

	const [questions, setQuestions] = useState<Array<Record<string, string | number>>>([]);
	const {fetching: fetchingQuestions, isLoading: isLoadingQuestions, error: errorQuestions} = useFetch(async () => {
		const data = await QuizApi.getQuestions(Number(id));
		setQuestions(data);
	});

	useEffect(() => {
		fetchingQuestions();
}, []);


	const [result, setResult] = useState<number>(-1);
	const {fetching: fetchingPost, isLoading: isLoadingPost, error: errorPost} = useFetch(async () => {
		const data = (sessionStorage.getItem(`quizAnswers${id}`));
		if(data !== null) {
			const answers = JSON.parse(data);
			const result = await QuizApi.postAnswer(Number(id), answers);
			setResult(result);
		} else {
			const result = await QuizApi.postAnswer(Number(id), {});
			setResult(result);
		}
	})


	const renderQuestions = () => {
		return questions.map((el) => {
			return <Task key={el.id} data={el} quizName={name} wasSent={wasSent} />
		})
	}


	const [isResultWindow, setResultWindow] = useState<boolean>(false);
	const [wasSent, setWasSent] = useState<boolean>(false);

	const sendResult = async () => {
		setWasSent(true);
		await fetchingPost();
		sessionStorage.removeItem(`quizAnswers${id}`);
		setResultWindow(true);
	}

	const renderResult = (count: number) => {
		return (
				isResultWindow && <div className={styles.result}>
				<h3>You are have scored {count} points</h3>
				<button onClick={
					() => {setResultWindow(false)}
				}>ok</button>
			</div>
		)
	}



	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h1>
					{`Quiz: ${name}`}
				</h1>
			</header>

			<main>
				{isLoadingQuestions && <p>Loading...</p>}
				{errorQuestions && <p style={{ color: "red" }}>Error: {errorQuestions}</p>}
				{!isLoadingQuestions && !errorQuestions && questions.length > 0 ? (
					renderQuestions()
				) : (
					!isLoadingQuestions && !errorQuestions && <p>No quizzes available</p>
				)}
			</main>

			<button disabled={result !== -1} onClick={async () => sendResult()}>
				send
			</button>
			{isLoadingPost && <p>Loading...</p>}
			{errorPost && <p style={{ color: "red" }}>Error: {errorPost}</p>}
			{!isLoadingPost && !errorPost && result >= 0 ? (

				renderResult(result)
			
			) : (
				!isLoadingPost && !errorPost && <h4></h4>
			)}
		</div>
	)
}

export default Quiz;