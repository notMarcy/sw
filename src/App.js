import { useState } from 'react';
import TodoList from './components/ToDos/TodoList';
import TodoAdd from './components/ToDos/TodoAdd';
import './App.css';

function App() {

  const [todos, setTodos] = useState([
    { text: 'Погулять с собакой', done: false },
    { text: 'Вынести мусор', done: false },
    { text: 'Прочитать 100 страниц', done: false }
  ])



  const addTodoHandler = (text) => {
    setTodos([...todos, { text, done: false }])
  }

  const toggleDone = (index) => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index].done = !updatedTodos[index].done
      return updatedTodos
    })
  }

  const deleteTask = (index) => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos.splice(index, 1)
      return updatedTodos
    })
  }

  const editTask = ((index, newText) => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index].text = newText
      return updatedTodos
    })
  })

  return (
    <div className="App">
      <div className="allMenuContainer">

      </div>
      <div className="allTodoContainer">
        <TodoList
          todos={todos}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        <TodoAdd
          addTodo={addTodoHandler}
        />
      </div>
    </div>
  )
}

export default App;
