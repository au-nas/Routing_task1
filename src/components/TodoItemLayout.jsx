import { Link } from 'react-router-dom';
import styles from '../App.module.css';

export const TodoItemLayout = ({ todo }) => {
	return (
		<li className={styles.item}>
			<Link to={`/task/${todo.id}`} className={styles.link}>
				<span className={styles.cuted}>{todo.title}</span>
			</Link>
		</li>
	);
};
