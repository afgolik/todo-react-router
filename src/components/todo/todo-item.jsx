import styles from './todo-item.module.css';
import { Button } from '../ui/button/button';
import { InputWithButton } from '../ui/input/input-with-button';
import {Link} from "react-router-dom";

export const TodoItem = ({
	id,
	todo,
	completed,
	isUpdated,
	onChange,
	onClick,
	isDeleted,
	onClickChange,
	editableElementId,
	onBlur,
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
