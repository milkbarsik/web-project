import styles from './card.module.css';
import im1 from '../../assets/Medvedev.png';
import im2 from '../../assets/Pavluchenko.png';
import im3 from '../../assets/Romanihin.png';
import im4 from '../../assets/Uvaisov.png';

const Card = ({name, imgsrc} : {name: string, imgsrc: string}) => {
    return (
        <div className={styles.card}>
            <img src={imgsrc}></img><br/>
            {name}
        </div>
    )   
}

const TeamCards = () => {
    const team = [
        { 'name': 'Медведев Евгений', 'src' : im1},
        { 'name': 'Павлюченко Михаил', 'src' : im2},
        { 'name': 'Романихин Михаил', 'src' : im3},
        { 'name': 'Увайсов Магомедрасул', 'src' : im4},
    ]

    return(
        <>
            <h2>Наша команда:</h2><br />
            <div className={styles.cardsdisplay}>
                {team.map(member => (
                    <Card name={member.name} imgsrc={member.src}/> //imgsrc='./Medvedev.png'/>
                ))}
            </div>
        </>
    )
}

export default TeamCards;
