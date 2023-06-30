import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

import Todo from './Todo';
import styles from './TodoList.module.css';

function TodoList({ todos, toggleDone, addToFav, deleteTask, editTask }) {
  const completedTodos = todos.filter((todo) => todo.done);
  const activeTodos = todos.filter((todo) => !todo.done);

  return (
    <div className={styles.allTodoContainer}>
      <ul className={styles.todoListContainer}>
        {!activeTodos.length && <h2>задач нет!</h2>}
        {activeTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            target={todo.id}
            toggleDone={toggleDone}
            addToFav={addToFav}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
        {completedTodos.length > 0 && (
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
              />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
