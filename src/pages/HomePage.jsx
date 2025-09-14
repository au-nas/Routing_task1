import { useState } from 'react';
import styles from '../App.module.css';
import { SearchBarLayout } from '../components/SearchBarLayout';
import { TodoListLayout } from '../components/TodoListLayout';
import { AddTodoFormLayout } from '../components/AddTodoFormLayout';

export const HomePage = ({ todos, setTodos, isLoading }) => {
	const [newTodo, setNewTodo] = useState('');
	const [search, setSearch] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const requestAddTodo = (event) => {
		event.preventDefault();

		const title = newTodo.trim();
		if (!title) return;

		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, completed: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos((prev) => [...prev, response]);
				setNewTodo('');
			});
	};

	let filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(search.toLowerCase()),
	);

	if (isSorted) {
		filteredTodos = [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
	}

	return (
		<>
			<h1 className={styles.title}>Список дел</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					<SearchBarLayout
						search={search}
						setSearch={setSearch}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
					/>
					<TodoListLayout filteredTodos={filteredTodos} />
					<AddTodoFormLayout
						newTodo={newTodo}
						setNewTodo={setNewTodo}
						requestAddTodo={requestAddTodo}
					/>
				</>
			)}
		</>
	);
};
