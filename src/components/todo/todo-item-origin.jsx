import styles from './todo-item.module.css';
import { Button } from '../ui/button/button';
import { InputWithButton } from '../ui/input/input-with-button';
import {Link, useParams} from 'react-router-dom';
import {useState} from "react";

export const TodoItemOrigin = ({
	onBlur,
	todoList,
	onChange,
	isUpdated,
	onClickChange,
	isDeleted,
	onClick,
}) => {
	const params = useParams();
	const todo = todoList.find(({ id }) => +params.id === id);
	const [isEdit, setIsEdit] = useState(false);
	const onEdit = () => {
		onClickChange(todo.id);
		setIsEdit(true);
	};
	const handleBlur = (value) => {
		onBlur(todo.id, value);
		setIsEdit(false);
	};
	return (
		<>
			<Link to='/'><Button text='Назад' className={styles.back} /></Link>
			{todo ? (
				<div className={styles.itemPage}>
					<div className={styles.container}>
						<div className={styles.content}>
							<form>
								<input
									onChange={() => onChange(todo.id)}
									className={styles.checkbox}
									disabled={isUpdated}
									checked={todo.completed}
									type='checkbox'
									id={todo.id}
								/>
								<label htmlFor={todo.id}></label>
							</form>
							<span
								className={
									todo.completed
										? `${styles.bigText} ${styles.done}`
										: styles.bigText
								}
							>
								{isEdit ? (
									<InputWithButton
										onBlur={handleBlur}
										initialValue={todo.todo}
										buttonText='&#10004;'
										buttonClassName={`${styles.edit} ${styles.button}`}
									/>
								) : (
									todo.todo
								)}
							</span>
						</div>
						<div className={styles.buttons}>
							<Button
								className={`${styles.change} ${styles.button}`}
								onClick={onEdit}
								text='&#9998;'
							/>
							<Button
								onClick={() => onClick(todo.id)}
								disabled={isDeleted}
								text='Удалить'
								className={`${styles.delete} ${styles.button}`}
							/>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
};
