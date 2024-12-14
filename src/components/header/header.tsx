import styles from './header.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../api/store/useAuth';

import home from '../../assets/header/home.svg';
import login from '../../assets/header/login.svg';
import logout from '../../assets/header/logout.svg';
import description from '../../assets/header/description.svg';
import translator from '../../assets/header/translator.svg';
import quiz from '../../assets/header/quiz.svg';

const Header = () => {

	const {
		isAuth,
		username,
		logOut,
	} = useAuth();

	return (
		<div className={styles.wrapper}>
			<Link to="https://sign-language.ru">
				<button className={styles.buttonText}>Домашняя</button>
				<button className={styles.buttonIcon}><img src={home} alt="" /></button>
			</Link>
			<Link to="https://sign-translator.ru">
				<button className={styles.buttonText}>Переводчик</button>
				<button className={styles.buttonIcon}><img src={translator} alt="" /></button>
			</Link>
			<Link to="/">
				<button className={styles.buttonText}>Описание</button>
				<button className={styles.buttonIcon}><img src={description} alt="" /></button>
			</Link>
			<Link to="/#quizzes">
				<button className={styles.buttonText}>Квизы</button>
				<button className={styles.buttonIcon}><img src={quiz} alt="" /></button>
			</Link>
			{
				!isAuth&&
				<Link
					style={{marginLeft: "auto"}}
					to="/auth"
				>
					<button className={styles.buttonText}>Войти</button>
					<button className={styles.buttonIcon}><img src={login} alt="" /></button>
				</Link>
			}
			{
				isAuth&&
				<div className={styles.user}>
					<p>{username}</p>
					<button
						className={styles.buttonText}
						onClick={() => logOut()}
					>
							Выйти
					</button> 
					<button
						className={styles.buttonIcon}
						onClick={() => logOut()}
					>
						<img src={logout} alt="" />
					</button>
				</div>
				
			}
		</div>
	)
}

export default Header;