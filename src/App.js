import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import React, { useState } from 'react';

import sortByDate from './utils/sortByDate';
import TodoList from './components/ToDos/TodoList';
import TodoAdd from './components/ToDos/TodoAdd';
import './App.css';

function App() {

  // Формат даты
  function formatDateTime(date) {
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    // const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} в ${hours}:${minutes}`;
  }

  // Начальные задачи
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: 'Погулять с собакой', done: false, date: formatDateTime(new Date()) },
    { id: uuidv4(), text: 'Вынести мусор', done: false, date: formatDateTime(new Date()) },
    { id: uuidv4(), text: 'Прочитать 100 страниц', done: false, date: formatDateTime(new Date()) }
  ])

  // Добавление задачи
  const addTodoHandler = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      done: false,
      date: formatDateTime(new Date())
    };
    setTodos([...todos, newTodo]);
  };

  // Выполнение задачи
  const toggleDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Редактирование задачи
  const editTask = (id, newText) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          if (todo.text !== newText) {
            return { ...todo, text: newText, date: formatDateTime(new Date()) };
          } else {
            return todo;
          }
        }
        return todo;
      });
    });
  };

  // Сортировка
  const sortTodosByDate = () => {
    setTodos(sortByDate(todos))
  }

  return (
    <div className="App">
      <div className="allMenuContainer">

      </div>
      <div className="allTodoContainer">
        {/* ЗАГОЛОВОК */}

        <div className='headerTodos'>
          <h2>
            <FontAwesomeIcon
              className="infinity"
              icon={faInfinity}
            />
            ВСЕ ЗАДАЧИ
          </h2>
          <div className="sort" onClick={sortTodosByDate}>
            <FontAwesomeIcon icon={faArrowDownWideShort}
            /></div>
        </div>

        {/* ЗАДАЧИ */}
        <TodoList
          todos={todos}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        {/* ДОБАВЛЕНИЕ ЗАДАЧ */}
        <TodoAdd
          addTodo={addTodoHandler}
        />
      </div>
    </div>
  )
}

export default App;
