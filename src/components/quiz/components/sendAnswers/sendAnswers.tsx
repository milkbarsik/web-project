import { FC } from "react";
import { useState, useEffect } from "react";
import QuizApi from "../../../../api/main/main";
import { useFetch } from "../../../../api/useFetch";
import styles from './sendAnswers.module.css';
import timerManager from "../timer/timer";


type props = {
	quizId: string | null;
	name: string | undefined;
	wasSent: boolean;
	needSend: boolean;
	setLocked: (param: boolean) => void;
	setWasSent: (param: boolean) => void;
}


const SendAsnwers:FC<props> = ( {quizId, name, wasSent, needSend, setLocked, setWasSent} ) => {

	const [result, setResult] = useState<number>(-1);
	const {fetching: fetchingPost, isLoading: isLoadingPost, error: errorPost} = useFetch(async () => {
		const data = (sessionStorage.getItem(`quizAnswers${quizId}`));
		if(data !== null) {
			const answers = JSON.parse(data);
			const result = await QuizApi.postAnswer(Number(quizId), answers);
			setResult(result);
		} else {
			const result = await QuizApi.postAnswer(Number(quizId), {});
			setResult(result);
		}
	})



	const [isResultWindow, setResultWindow] = useState<boolean>(false);


		const sendResult = async () => {
		timerManager.unsubscribe(name !== undefined ? name: '');
		setLocked(true);
		setWasSent(true);
		await fetchingPost();
		sessionStorage.removeItem(`quizAnswers${quizId}`);
		setResultWindow(true);
	}

	useEffect(() => {
		if (needSend) {
			sendResult();
		}
	}, [needSend]);
	

	const restart = () => {
		setResultWindow(false);
	}

	const renderResult = (count: number) => {
		return (
				isResultWindow && <div className={styles.result}>
				<h3>You are have scored {count} points</h3>
				<button onClick={
					() => {restart()}
				}>restart</button>
			</div>
		)
	}
	return (
		<div>
			{!wasSent && <button disabled={result !== -1} onClick={async () => sendResult()}>
					send
			</button>}
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

export default SendAsnwers;