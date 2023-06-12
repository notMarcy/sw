import { useState } from 'react';
import TodoList from './components/ToDos/TodoList';
import TodoAdd from './components/ToDos/TodoAdd';
import './App.css';

function App() {

  const [todos, setTodos] = useState([
    { text: 'fads1', done: false },
    { text: 'fads2', done: false },
    { text: 'fads3', done: false }
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

  return (
    <div className="App">
      <div className="allMenuContainer">

      </div>
      <div className="allTodoContainer">
        <TodoList todos={todos} toggleDone={toggleDone} />
        <TodoAdd addTodo={addTodoHandler} />
      </div>
    </div>
  )
}

export default App;
