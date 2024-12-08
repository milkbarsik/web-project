import styles from './header.module.css'
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<Link to="/">
				<button>home</button>
			</Link>
			<Link to="/#quizzes">
				<button>quizzes</button>
			</Link>
		</div>
	)
}

export default Header;