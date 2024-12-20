import styles from './team-cards.module.css';
import Card from './card/card';
import im1 from '../../../assets/cards/Medvedev.jpg';
import im2 from '../../../assets/cards/Pavluchenko.png';
import im3 from '../../../assets/cards/Romanikhin.jpg';
import im4 from '../../../assets/cards/Uvaisov.jpg';

const TeamCards = () => {

	const team: Array<Record<string, string>> = [
		{ 'name': 'Медведев Евгений', 'src' : im1},
		{ 'name': 'Павлюченко Михаил', 'src' : im2},
		{ 'name': 'Романихин Михаил', 'src' : im3},
		{ 'name': 'Увайсов Магомедрасул', 'src' : im4},
	]

	return(
		<div className={styles.wrapper}>
			<h2>Наша команда:</h2>
			<div className={styles.cardsdisplay}>
				{team.map(member => (
						<Card key={member.name} name={member.name} src={member.src} width='100%' height='auto'/> //imgsrc='./Medvedev.png'/>
				))}
			</div>
		</div>
	)
}

export default TeamCards;
