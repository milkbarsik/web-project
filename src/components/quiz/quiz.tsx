import { useEffect, useState } from "react";
import styles from './quiz.module.css';
import { useFetch } from "../../api/useFetch";
import QuizApi from "../../api/main/main";
import { useParams } from "react-router-dom";
import TaskList from "./components/task-list";
import SendAsnwers from "./components/sendAnswers";
import timerManager from "./components/timer/timer";


const Quiz = () => {

	const { name } = useParams<{ name: string}>();
	let data = sessionStorage.getItem(`${name}`);
	const quizObject = data !== null ? JSON.parse(data) : '';
	const {id, isStarted} = quizObject;
	const [time, setTime] = useState<number>(quizObject.time);


	const [questions, setQuestions] = useState<Array<Record<string, string | number>>>([]);
	const {fetching: fetchingQuestions, isLoading: isLoadingQuestions, error: errorQuestions} = useFetch(async () => {
		const res = await QuizApi.getQuestions(Number(id));
		setQuestions(res);
	});

	useEffect(() => {
		fetchingQuestions();
		if (time > 290 && isStart) {
			timerManager.subscribe(changeTime, name !== undefined ? name : '');
		} else {
			setLocked(true);
		}
	}, []);


	const [isStart, setStart] = useState<boolean>(isStarted);
	const [isLocked, setLocked] = useState<boolean>(isStart && time <= 290);

	const start = () => {
		setStart(true);
		if (time > 290) {
			timerManager.subscribe(changeTime, name !== undefined ? name : '');
		} else {
			setLocked(true);
		}
		quizObject.isStarted = true;
		sessionStorage.setItem(`${name}`, JSON.stringify(quizObject));
	}


	const changeTime = () => {
		setTime((prev) => {
			quizObject.time--;
			sessionStorage.setItem(`${name}`, JSON.stringify(
				quizObject
			))
			if(prev <= 291) {
				timerManager.unsubscribe(name !== undefined ? name : '');
				setLocked(true);
			}
			return prev - 1
		})
	}


	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h1>
					{`Quiz: ${name} ${time}s`}
				</h1>
			</header>
			
			<main>
				{!isStart && <button onClick={() => start()}>start quiz</button>}
				
				{isStart && <div className={styles.content}>
					<TaskList
						name={name}
						isLocked={isLocked}
						questions={questions}
						isLoading={isLoadingQuestions}
						error={errorQuestions}
					/>

					<SendAsnwers quizId={id} setLocked={setLocked} />
				</div>}
			</main>
		</div>
	)
}

export default Quiz;