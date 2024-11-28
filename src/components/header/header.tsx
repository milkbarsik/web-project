import styles from './header.module.css'

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<a href="/"><button>home</button></a>
		</div>
	)
}

export default Header;