import TeamCards from './cards';
import styles from './footer.module.css';

const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<TeamCards />
			<div className={styles.textWrapper}>
				<p className={styles.description}>
					Данный проект является частью исследования под названием «Расширение 
					возможностей коммуникации с помощью удобного многоязычного словаря 
					жестового языка», поддерживаемого Московским политехническим университетом в 
					рамках гранта имени В. Е. Фортова.
				</p>
				<div className={styles.footerLinks}>
					<a href="https://mospolytech.ru/?ysclid=m4nudoonsr123646967" target='_blank'>
						Московский Политех
					</a>
					<a href="https://t.me/mospolytech" target='_blank'>
						Телеграм
					</a>
					<a href="https://ok.ru/group/58571994300421" target='_blank'>
						Одноклассники
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer;