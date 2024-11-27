import { FC, useEffect, useState} from "react";
import styles from './main-page.module.css';
import { useFetch } from "../../api/useFetch";
import QuizeApi from "../../api/main/main";
import QuizButton from "./components";

const MainPage:FC = () => {

	const [quizes, setQuizes] = useState<Array<{ id: string; name: string }>>([]);

	const {fetching, isLoading, error } = useFetch( async () => {
		const data = await QuizeApi.getQuizes();
		setQuizes(data);
	} )

	useEffect(() => {
		fetching();
	}, []);


	const renderQuizButtons = () => {
		return quizes.map((el) => {
			return <QuizButton key={el.name} path={`/quiz/${el.name}`} name={el.name} id={el.id} />
		})
	}

	return (
		<div className={styles.wrapper}>

			<div className={styles.content}>
				<h3>Advantages of Quizzes</h3>
				<p>
					Tests support students' in the acquisition of a general or specific knowledge of a 
					subject. Quizzes are meant to promote enjoyable learning strategies and improve 
					general knowledge. Quiz tournaments allow students to "think outside the box" 
					and from a variety of angles.
				</p>
				<h3>Topics which are covered</h3>
				<p>
					HTML, CSS, and JavaScript are the first few languages we should learn in order to 
					begin as a Front End Developer. Because of their close relationship, 
					HTML and CSS are usually taught together. JavaScript will also be covered in 
					this course together with HTML and CSS.
					The fundamentals of PHP and WebGL are then presented, in addition to Automation 
					Testing. Topics like HTTP, Developer Tools, the internet, and the web will be 
					briefly covered in the theoretical sections. Additionally, 
					frameworks like Laravel and BootStrap will be covered. 
					A cloud-based design tool named Figma is also included in this 
					course so that designers can collaborate, and implement their creative 
					ideas more effectively.
				</p>
				<h3>Topics for quizzes</h3>
				<p>
					<b>Followings</b> are the quizzes topics, which contain simple questions for beginners:
				</p>
			</div>

			<div className={styles.quizButtonsWrapper}>
				{isLoading && <p>Loading...</p>}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}
				{!isLoading && !error && quizes.length > 0 ? (
					renderQuizButtons()
				) : (
					!isLoading && !error && <p>No quizzes available</p>
				)}
			</div>
		</div>
	)
}

export default MainPage;