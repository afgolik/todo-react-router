import styles from './todo-item.module.css';
import {Link} from "react-router-dom";

export const TodoItem = ({
	id,
	todo,
	completed,
	isUpdated,
	onChange,
}) => {
	return (
		<div key={id} className={styles.item}>
			<div className={styles.container}>
				<div className={styles.content}>
					<form>
						<input
							onChange={() => onChange(id)}
							className={styles.checkbox}
							disabled={isUpdated}
							checked={completed}
							type='checkbox'
							id={id}
						/>
						<label htmlFor={id}></label>
					</form>
					<span className={completed ? `${styles.text} ${styles.done}` : styles.text}>
						<Link to={`task/${id}`}>
							{todo}
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};
