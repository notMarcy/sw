import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Statistica from './Statistics'
import Todo from './Todo';
import styles from './TodoList.module.css';

function TodoList({ todos, toggleDone, addToFav, deleteTask, editTask, selectedCategory, allTodos, formatDateTime}) {
  const completedTodos = todos.filter((todo) => todo.done);
  const activeTodos = todos.filter((todo) => !todo.done);
  const today = new Date();
  const formattedToday = formatDateTime(today);
  const forToday = allTodos.filter((todo) => {
        return (
          todo.date.split(' ')[0] === formattedToday.split(' ')[0] &&
          todo.date.split(' ')[1] === formattedToday.split(' ')[1]
        )
  });
  return (
    <div className={styles.allTodoContainer}>
      <ul className={styles.todoListContainer}>
        {!(selectedCategory === 'statistics') && !activeTodos.length && <h2>задач нет!</h2>}
        {!(selectedCategory === 'statistics')  && activeTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            target={todo.id}
            toggleDone={toggleDone}
            addToFav={addToFav}
            deleteTask={deleteTask}
            editTask={editTask}
            // allDone={allDone}
          />
        ))}
        {!(selectedCategory === 'statistics') && completedTodos.length > 0 && (
          <div className={styles.completed}>
            <h2>
              <FontAwesomeIcon className="infinity" icon={faCircleCheck} />
              ВЫПОЛНЕННЫЕ
            </h2>
            {completedTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                target={todo.id}
                toggleDone={toggleDone}
                addToFav={addToFav}
                deleteTask={deleteTask}
                editTask={editTask}
                // allDone={allDone}
              />
            ))}
          </div>
        )}
        {selectedCategory === 'statistics' && <Statistica
          forToday={forToday}
          todos={todos}
          allTodos={allTodos}
        />}
      </ul>
    </div>
  );
}

export default TodoList;
