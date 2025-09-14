import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../App.module.css';

export const TaskPage = ({ todos, setTodos }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState(null);
	const [editingText, setEditingText] = useState('');

	useEffect(() => {
		const todo = todos.find((t) => t.id === Number(id));
		if (todo) {
			setTask(todo);
			setEditingText(todo.title);
		}
	}, [id, todos]);

	if (!task) return <p>Задача не найдена</p>;

	const saveEdit = () => {
		const newTitle = editingText.trim();
		if (!newTitle) return;

		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: newTitle }),
		})
			.then((res) => res.json())
			.then((updatedTodo) => {
				setTodos((prev) =>
					prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
				);
				setTask(updatedTodo);
			});
	};

	const deleteTodo = () => {
		fetch(`http://localhost:3003/todos/${id}`, { method: 'DELETE' }).then(() => {
			setTodos((prev) => prev.filter((todo) => todo.id !== Number(id)));
			navigate('/');
		});
	};
	return (
		<div>
			<button onClick={() => navigate(-1)} className={styles.button}>
				← Назад
			</button>
			<h2>Задача #{task.id}</h2>
			<textarea
				value={editingText}
				onChange={(e) => setEditingText(e.target.value)}
				className={styles.input}
			/>
			<div>
				<button onClick={saveEdit} className={`${styles.button} ${styles.save}`}>
					Сохранить
				</button>
				<button
					onClick={deleteTodo}
					className={`${styles.button} ${styles.delete}`}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};
