import { FC, useEffect } from "react";
import styles from './quiz.module.css';
import { data } from "./constants";

type props = {
	quizData: {
		id: number;
		name: string;
	};
}

const Quiz:FC<props> = ( {quizData} ) => {

	useEffect(() => {
		console.log(`какой-то асинхронный запрос к ${quizData}`);
	}, []);

	return (
		<div className={styles.wrapper}>
			<header>
				<h2>
					{data.quizData.name}
				</h2>
			</header>
			<main>
				
			</main>
		</div>
	)
}

export default Quiz;