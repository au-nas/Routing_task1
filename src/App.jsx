import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { HomePage, TaskPage, NotFoundPage } from './pages';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3003/todos')
			.then((res) => res.json())
			.then((data) => setTodos(data))
			.catch((e) => {
				console.error('Ошибка загрузки todos', e);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.container}>

			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<Routes>
					<Route
						path="/"
						element={
							<HomePage
								todos={todos}
								setTodos={setTodos}
								isLoading={isLoading}
							/>
						}
					/>

					<Route
						path="/task/:id"
						element={<TaskPage todos={todos} setTodos={setTodos} />}
					/>

					<Route path="/404" element={<NotFoundPage />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Routes>
			)}
		</div>
	);
};
