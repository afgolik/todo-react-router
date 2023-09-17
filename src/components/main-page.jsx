import { Search } from './ui/search/search';
import styles from '../app.module.css';
import { Modal } from './ui/modal/modal';
import { Button } from './ui/button/button';
import { Loader } from './ui/loader/loader';
import { TodoList } from './todo/todo-list';
import React from 'react';

export const MainPage = ({
	modalActive,
	addInputValue,
	setAddInputValue,
	requestUpdateTodo,
	requestAddTodo,
	sortedTodoList,
	sortTodo,
	isCreated,
	isDeleted,
	requestDeleteTodo,
	isEdited,
	isSorted,
	searchingTodo,
	onReset,
	isLoading,
	requestUpdateStatus,
	isSearched,
	isUpdated,
	setModalActive,
	todoList,
}) => {
	return (
		<>
			<Search onClick={searchingTodo} isSearched={isSearched} onReset={onReset} />
			<div className={styles.buttonBlock}>
				<Modal
					active={modalActive}
					setActive={setModalActive}
					initialValue={addInputValue}
					onChange={setAddInputValue}
					onClick={requestAddTodo}
					disabled={isCreated}
				/>
				<Button
					text={isSorted ? 'Не сортировать' : 'Отсортировать'}
					onClick={sortTodo}
					className={isSorted ? styles.sortButton : null}
				/>
			</div>
			{isLoading ? (
				<Loader />
			) : todoList.length ? (
				<TodoList
					todoList={sortedTodoList}
					isUpdated={isUpdated}
					onChange={requestUpdateStatus}
					onClick={requestDeleteTodo}
					isDeleted={isDeleted}
					isEdited={isEdited}
					onBlur={requestUpdateTodo}
				/>
			) : (
				<div className={styles.text}>Список задач пуст</div>
			)}
		</>
	);
};
