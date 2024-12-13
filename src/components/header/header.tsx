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
				<button>Описание</button>
			</Link>
			<Link to="/#quizzes">
				<button>Квизы</button>
			</Link>
			{
				!isAuth&&
				<Link
					style={{marginLeft: "auto"}}
					to="/auth"
				>
					<button>Войти</button>
				</Link>
			}
			{
				isAuth&&
				<div className={styles.user}>
					<p>{username}</p>
					<button onClick={() => logOut()}>Выйти</button>
				</div>
				
			}
		</div>
	)
}

export default Header;