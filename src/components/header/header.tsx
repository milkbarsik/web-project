import styles from './header.module.css'

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<a href="/"><button><p>home</p></button></a>
		</div>
	)
}

export default Header;