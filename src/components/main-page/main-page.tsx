import { FC, useEffect, useState} from "react";
import styles from './main-page.module.css';
import { useFetch } from "../../api/useFetch";
import QuizeApi from "../../api/main/main";

const MainPage:FC = () => {

	const [quizes, setQuizes] = useState({});

	const {fetching, isLoading, error } = useFetch( async () => {
		const data = await QuizeApi.getQuizes();
		setQuizes(data);
	} )

	useEffect(() => {
		fetching();
	}, []);

	return (
		<div className={styles.wrapper}>
			<a href="/quiz"><button>пройти квиз</button></a>
		</div>
	)
}

export default MainPage;