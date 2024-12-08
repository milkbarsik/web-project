import { FC } from "react";
import { useEffect } from "react";
import QuizApi from "../../../../api/main/main";
import { useFetch } from "../../../../api/useFetch";
import timerManager from "../timer/timer";
import styles from './sendAnswers.module.css';
import { useQuizObject } from "../../../../context/quizContext";
import Restart from "./restart";

type props = {
	name: string | undefined;
}


const SendAsnwers:FC<props> = ( {name } ) => {

	const {
		id,
		wasSent,
		result,
		needSend,
		setQuizField,
		saveQuizObject,
	} = useQuizObject();

	const {fetching: fetchingPost, isLoading: isLoadingPost, error: errorPost} = useFetch(async () => {
		const data = (sessionStorage.getItem(`quizAnswers${id}`));
		if(data !== null) {
			const answers = JSON.parse(data);
			const res = await QuizApi.postAnswer(Number(id), answers);
			setQuizField({result: res});
			saveQuizObject(name);
		} else {
			const res = await QuizApi.postAnswer(Number(id), {});
			setQuizField({result: res});
			saveQuizObject(name);
		}
	})


		const sendResult = async () => {
			timerManager.unsubscribe(name !== undefined ? name: '');
			setQuizField({isLocked: true, wasSent: true, needSend: false});
			await fetchingPost();
			saveQuizObject(name);
	}

	useEffect(() => {
		if (needSend) {
			console.log('send');
			sendResult();
		}
	}, [needSend]);



	const renderResult = (result: number | string) => {
		return (
			result !== '...' &&
			<div className={styles.result}>
				<h3>You are have scored {result} points</h3>
			</div>
		)
	}
	return (
		<div>
			{!wasSent && <button disabled={result !== "..."} onClick={async () => sendResult()}>
					send
			</button>}
			{isLoadingPost && <p>Loading...</p>}
			{errorPost && <p style={{ color: "red" }}>Error: {errorPost}</p>}

			{renderResult(result)}

			{wasSent && 
			<Restart
				name={name}
			/>}
		</div>
	)
}

export default SendAsnwers;