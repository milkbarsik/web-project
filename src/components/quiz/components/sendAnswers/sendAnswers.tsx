import { FC } from "react";
import { useEffect } from "react";
import QuizApi from "../../../../api/main/main";
import { useFetch } from "../../../../api/useFetch";
import styles from './sendAnswers.module.css';
import { useQuizObject } from "../../../../context/quizContext";
import Restart from "./restart";

type props = {
	name: string | undefined;
	timer: any
}


const SendAsnwers:FC<props> = ( { name, timer } ) => {

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
			if(res.status === 460) {
				setQuizField({result: res.status});
				saveQuizObject(name);
				return
			}
			if(res.status === 200) {
				setQuizField({result: res.data.res});
				saveQuizObject(name);
			}
		} else {
			const res = await QuizApi.postAnswer(Number(id), {});
			if(res.status === 460) {
				setQuizField({result: res.status});
				saveQuizObject(name);
				return
			}
			if(res.status === 200) {
				setQuizField({result: res.data.res});
				saveQuizObject(name);
			}
		}
	})


		const sendResult = async () => {
			clearInterval(timer);
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
		if(result === 460) {
			return (
				<div className={styles.resultParent}>
					<div className={styles.result}>
				<h3>Вы использовали максимальное число попыток</h3>
			</div>
				</div>
			)
		}
		return (
			result !== -1 &&
			<div className={styles.result}>
				<h3>Вы набрали {result} очков</h3>
			</div>
		)
	}
	return (
		<div>
			{!wasSent && <button disabled={result !== -1} onClick={async () => sendResult()}>
					Отправить
			</button>}
			{isLoadingPost && <p>Loading...</p>}
			{errorPost && result !== 460 && <p style={{ color: "red" }}>Error: {errorPost}</p>}
			

			{!isLoadingPost && renderResult(result)}

			{wasSent && result < 50 &&
			<Restart
				name={name}
			/>}
		</div>
	)
}

export default SendAsnwers;