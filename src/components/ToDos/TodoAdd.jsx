import { useState } from "react"
import styles from './TodoAdd.module.css'

function TodoAdd({ addTodo }) {
  const [text, setText] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <div className={styles.todoAddContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="enter new todo"
          value={text}
          onChange={(e) => { setText(e.target.value) }}
        />
        {/* <button type="submit">Add</button> */}
      </form>
    </div>
  )
}

export default TodoAdd
