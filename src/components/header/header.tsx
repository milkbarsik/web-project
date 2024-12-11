import styles from './header.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../api/store/useAuth';

const Header = () => {

	const {
		isAuth,
		username,
		logOut,
	} = useAuth();

	return (
		<div className={styles.wrapper}>
			<Link to="/">
				<button>home</button>
			</Link>
			<Link to="/#quizzes">
				<button>quizzes</button>
			</Link>
			{
				!isAuth&&
				<Link
					style={{marginLeft: "auto"}}
					to="/auth"
				>
					<button>login</button>
				</Link>
			}
			{
				isAuth&&
				<div className={styles.user}>
					<p>{username}</p>
					<button onClick={() => logOut()}>logout</button>
				</div>
				
			}
		</div>
	)
}

export default Header;