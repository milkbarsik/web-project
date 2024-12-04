import { useEffect } from "react";
import styles from './quiz.module.css';
import { useParams } from "react-router-dom";
import TaskList from "./components/task-list";
import SendAsnwers from "./components/sendAnswers";
import timerManager from "./components/timer/timer";
import StartQuiz from "./components/start-quiz";
import { useQuizObject } from "../../context/quizContext";

const Quiz = () => {

	const { name } = useParams<{ name: string}>();

	const {
    time,
    isStarted,
		setTime,
    setQuizField,
    loadQuizObject,
		saveQuizObject,
  } = useQuizObject();



	const changeTime = (time: number) => {
		let currentTime = time;
		return () => {
			setTime();
			currentTime--;
			if(currentTime <= 0) {
				timerManager.unsubscribe(name !== undefined ? name : '');
				setQuizField({isLocked: true, needSend: true});
			}
			saveQuizObject(name);
		}
	}


	useEffect(() => {
		if (name) {
			loadQuizObject(name);
	
			const currentQuizState = useQuizObject.getState();
			if (
				currentQuizState.isStarted &&
				!currentQuizState.wasSent &&
				currentQuizState.time > 0
			) {
				timerManager.subscribe(changeTime(currentQuizState.time), name);
				console.log("subscribe");
			}
	
			if (currentQuizState.time === 0 && !currentQuizState.wasSent) {
				setQuizField({needSend: true});
			}
		}
	}, []);


	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h1>
					{`Quiz: ${name} ${time}s`}
				</h1>
			</header>
			
			<main>
				{!isStarted && <StartQuiz
					name={name}
					changeTime={changeTime(time)}
				/>}

				{
					isStarted &&
					<div className={styles.content}>
						<TaskList
							name={name}
						/>
						<SendAsnwers
							name={name}
						/>
					</div>
				}
			</main>
		</div>
	)
}

export default Quiz;