import { FC } from "react";
import styles from './card.module.css';

type props = {
	src: string;
	name: string;
	height: string;
	width: string;
}

const Card:FC<props> = ({src, name, height, width}) => {
	return (
		<div className={styles.card}>
			<img
				className={styles.image}
				src={src}
				style={{
					height: `${height}`,
					width: `${width}`
				}}
			/>
			<p style={{marginTop: "auto"}}>{name}</p>
		</div>
	)
}

export default Card;