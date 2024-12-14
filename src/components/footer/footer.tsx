import TeamCards from './cards';
import styles from './footer.module.css';

const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.textWrapper}>
				<p className={styles.text}>
					Each page should include a footer that reads: 
					"This project is a part of research titled 'Empowering 
					Communication with a User-Friendly Multilingual Sign Language Dictionary' 
					supported by Moscow Polytechnic University under V.E. Fortov’s Grant." 
					Additionally, please link to our university’s official website within the 
					footer to ensure proper acknowledgment, also social medias like: telegram, 
					WhatsApp or email address.
				</p>
			</div>
			<TeamCards />
		</div>
	)
}

export default Footer;