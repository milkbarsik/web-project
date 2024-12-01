import { useEffect, useState } from "react";
import styles from './quiz.module.css';
import { useFetch } from "../../api/useFetch";
import QuizApi from "../../api/main/main";
import { useParams } from "react-router-dom";
import TaskList from "./components/task-list";
import SendAsnwers from "./components/sendAnswers";
import timerManager from "./components/timer/timer";
import StartQuiz from "./components/start-quiz";


const Quiz = () => {

	const { name } = useParams<{ name: string}>();
	const data = sessionStorage.getItem(`${name}`);
	const quizObject = data !== null ? JSON.parse(data) : '';
	const {id, isStarted} = quizObject;
	const [time, setTime] = useState<number>(quizObject.time);

	const [isStart, setStart] = useState<boolean>(isStarted);
	const [isLocked, setLocked] = useState<boolean>(quizObject.isLocked);
	const [wasSent, setWasSent] = useState<boolean>(false);
	const [needSend, setNeedSend] = useState<boolean>(false);

	const [questions, setQuestions] = useState<Array<Record<string, string | number>>>([]);
	const {fetching: fetchingQuestions, isLoading: isLoadingQuestions, error: errorQuestions} = useFetch(async () => {
		const res = await QuizApi.getQuestions(Number(id));
		setQuestions(res);
		quizObject.questions = res;
		sessionStorage.setItem(`${name}`, JSON.stringify(quizObject));
	});

	const changeTime = () => {
		setTime((prev) => {
			quizObject.time--;
			sessionStorage.setItem(`${name}`, JSON.stringify(
				quizObject
			))
			if(prev <= 1) {
				timerManager.unsubscribe(name !== undefined ? name : '');
				setLocked(true);
				setNeedSend(true);
			}
			return prev - 1
		})
	}


	useEffect(() => {
		if( Object.keys(quizObject.questions).length === 0 ) {
			fetchingQuestions();
		} else {
			console.log('have questions');
			setQuestions(quizObject.questions);
		}
		if (isStart && !wasSent && time > 0) {
			timerManager.subscribe(changeTime, name !== undefined ? name : '');
		}
		if(time === 0) setNeedSend(true);
	}, []);


	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h1>
					{`Quiz: ${name} ${time}s`}
				</h1>
			</header>
			
			<main>

				{!isStart && <StartQuiz
					name={name}
					quizObject={quizObject}
					setStart={setStart}
					setLocked={setLocked}
					changeTime={changeTime}
				/>}

				{
					isStart &&
					<div className={styles.content}>
						<TaskList
							name={name}
							isLocked={isLocked}
							questions={questions}
							isLoading={isLoadingQuestions}
							error={errorQuestions}
						/>
						<SendAsnwers
							quizId={id}
							name={name}
							wasSent={wasSent}
							needSend={needSend}
							setLocked={setLocked}
							setWasSent={setWasSent}
						/>
					</div>
				}
			</main>
		</div>
	)
}

export default Quiz;