import styles from './Todo.module.css'

function Todo({ todo, targetIndex, toggleDone }) {
  return (
    <li className={`${styles.todoContainer} ${todo.done ? styles.done : ''}`}>
      <div
        className={styles.check}
        onClick={() => { toggleDone(targetIndex) }}
      >
        {todo.done && <span>V</span>}
      </div>
      <p>{todo.text}</p>
    </li>
  )
}

export default Todo