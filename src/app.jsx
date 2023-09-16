import React from 'react';
import styles from './app.module.css';
import { useState } from 'react';
import { TodoList } from './components/todo/todo-list';
import { Loader } from './components/ui/loader/loader';
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestUpdateStatus,
	useRequestGetTodos,
	useRequestUpdateTodo,
	useSearchingTodo,
	useSortTodo,
} from './hook';
import { Modal } from './components/ui/modal/modal';
import { Search } from './components/ui/search/search';
import { Button } from './components/ui/button/button';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import { NotFound } from './components/404/not-foung';
import { MainPage } from './components/main-page';

export const App = () => {
	const [modalActive, setModalActive] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const { todoList, isLoading } = useRequestGetTodos(refreshTodosFlag);
	const { isCreated, requestAddTodo, addInputValue, setAddInputValue } =
		useRequestAddTodo(refreshTodos, setModalActive);
	const { isUpdated, requestUpdateStatus } = useRequestUpdateStatus(
		todoList,
		refreshTodos,
	);
	const { isDeleted, requestDeleteTodo } = useRequestDeleteTodo(todoList, refreshTodos);
	const { isEdited, editableElementId, requestUpdateTodo, setEditableElementId } =
		useRequestUpdateTodo(todoList, refreshTodos);
	const { isSearched, searchedTodoList, searchingTodo, onReset } =
		useSearchingTodo(todoList);
	const { isSorted, sortedTodoList, sortTodo } = useSortTodo(searchedTodoList);

	const onClickChange = (id) => setEditableElementId(id);

	return (
		<div className={styles.app}>

			<div className={styles.links}>

			</div>

			<Routes>
				<Route
					path='/'
					element={
						<MainPage
							modalActive={modalActive}
							isLoading={isLoading}
							isCreated={isCreated}
							requestAddTodo={requestAddTodo}
							addInputValue={addInputValue}
							setAddInputValue={setAddInputValue}
							isUpdated={isUpdated}
							requestUpdateStatus={requestUpdateStatus}
							isDeleted={isDeleted}
							requestDeleteTodo={requestDeleteTodo}
							isEdited={isEdited}
							editableElementId={editableElementId}
							requestUpdateTodo={requestUpdateTodo}
							isSearched={isSearched}
							searchingTodo={searchingTodo}
							onReset={onReset}
							isSorted={isSorted}
							sortedTodoList={sortedTodoList}
							sortTodo={sortTodo}
							onClickChange={onClickChange}
							setModalActive={setModalActive}
							todoList={todoList}
						/>
					}
				/>
				<Route path='/404' element={<NotFound />} />
				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
		</div>
	);
};
