import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';

import Todo from './Todo'
import styles from './TodoList.module.css'

function TodoList({ todos, toggleDone, deleteTask, editTask }) {
  return (
    <div className={styles.allTodoContainer}>
      <h2><FontAwesomeIcon className={styles.infinity} icon={faInfinity} /> ВСЕ ЗАДАЧИ</h2>
      <ul className={styles.todoListContainer}>

        {!todos.length && <h2>задач нет!</h2>}
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            targetIndex={index}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList