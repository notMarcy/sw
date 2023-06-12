import Todo from './Todo'
import styles from './TodoList.module.css'



function TodoList({ todos, toggleDone }) {
  return (
    <div className={styles.allTodoContainer}>
      <h2><div className={styles.infinityLogo}></div> all tasks</h2>
      <ul className={styles.todoListContainer}>

        {!todos.length && <h2>all done!</h2>}
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            targetIndex={index}
            toggleDone={toggleDone}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList