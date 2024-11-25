import { FC } from "react";
import { Link } from "react-router-dom";
import styles from './quiz-button.module.css'

type props = {
	path: string;
	name: string;
}

const QuizButton:FC<props> = ( {name, path} ) => {

	return (
		<Link to={path} className={styles.wrapper}>
			<button>
				{name}
			</button>
		</Link>
	)
}

export default QuizButton;