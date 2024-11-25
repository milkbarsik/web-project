import { FC } from "react";
import styles from './task.module.css';

type props = {
  data: {
    [key: string]: string | number;
  };
};

const Task:FC<props> = ( {data} ) => {
	return (
		<div className={styles.wrapper}>
			<h4>{data.content}</h4>
		</div>
	)
}

export default Task;