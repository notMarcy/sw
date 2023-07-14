import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInfinity, faArrowDownWideShort, faSun, faStar, faTable } from '@fortawesome/free-solid-svg-icons';
import {faCircleUp} from '@fortawesome/free-regular-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import sortByDate from './utils/sortByDate';
import Profile from './components/Menu/Profile';
import Search from './components/Menu/Search';
import AllCategories from './components/Menu/AllCategories';
import TodoList from './components/ToDos/TodoList';
import TodoAdd from './components/ToDos/TodoAdd';
import './App.css';
import RegForm from './reg-aut-form/Reg';
import AutForm from './reg-aut-form/Aut';

function App() {

  // Данные для профиля
  const [nickname, setNickname] = useState('Иван Петров')
  const [email, setEmail] = useState('petrov@gmail.com')
  const [avatar, setAvatar] = useState(false)
  const [authorised, setAuthorised] = useState(false);
  // Формат даты
  function formatDateTime(date) {
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} в ${hours}:${minutes}`;
  }

  // Начальные задачи
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: 'Погулять с собакой', done: false, date: '30 августа в 16:14', favorite: false },
    { id: uuidv4(), text: 'Вынести мусор', done: false, date: formatDateTime(new Date()), favorite: false },
    { id: uuidv4(), text: 'Прочитать 100 страниц', done: false, date: formatDateTime(new Date()), favorite: false }
  ])

  // Поиск 
  const [searchTerm, setSearchTerm] = useState('')
  var allDone = [];
  allDone = todos.filter(() => todos.done);

  const handleSearch = (event) => {
    handleCategoryChange('all')
    setSearchTerm(event.target.value)
  }

  const filterTodosBySearch = (todos) => {
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Категории задач
  const [categoryName, setCategoryName] = useState('ВСЕ ЗАДАЧИ')
  const [categoryIcon, setCategoryIcon] = useState(<FontAwesomeIcon className="logoIcon" icon={faInfinity} />)
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Изменение заголовка и иконки
  const handleCategoryChange = (category, activeCategory) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setCategoryName('ВСЕ ЗАДАЧИ')
      setCategoryIcon(<FontAwesomeIcon className="logoIcon" icon={faInfinity} />)
    }
    else if (category === 'today') {
      setCategoryName('СЕГОДНЯ')
      setCategoryIcon(<FontAwesomeIcon className="logoIcon" icon={faSun} />)
    }
    else if (category === 'favorites') {
      setCategoryName('ИЗБРАННЫЕ')
      setCategoryIcon(<FontAwesomeIcon className="logoIcon" icon={faStar} />)
    }
    else if (category === 'statistics') {
      setCategoryName('СТАТИСТИКА')
      setCategoryIcon(<FontAwesomeIcon className="logoIcon" icon={faTable} />)
    }
  };

  // Фильтрация задач по категории
  const filterTodosByCategory = (todos) => {
    if (selectedCategory === 'all') {
      return todos;
    }
    else if (selectedCategory === 'today') {
      const today = new Date();
      const formattedToday = formatDateTime(today);
      return todos.filter((todo) => {
        return (
          todo.date.split(' ')[0] === formattedToday.split(' ')[0] &&
          todo.date.split(' ')[1] === formattedToday.split(' ')[1]
        )
      });
    }
    else if (selectedCategory === 'favorites') {
      return todos.filter((todo) => todo.favorite)
    }
    else if (selectedCategory === 'statistics'){
      return todos.filter((todo) => todo.done);
    }
  };

  // Применение фильтрации
  const applyFilters = (todos) => {
    let filteredTodos = todos;

    if (searchTerm === '') {
      filteredTodos = filterTodosByCategory(filteredTodos);
    } else {
      filteredTodos = filterTodosBySearch(filteredTodos);
    }

    return filteredTodos;
  };

  // Добавление задачи
  const addTodoHandler = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      done: false,
      date: formatDateTime(new Date()),
      favorite: false,
      isNew: true,
    };
    setTodos([...todos, newTodo]);

    // Удаление свойства isNew через 350мс
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === newTodo.id ? { ...todo, isNew: false } : todo
        )
      );
    }, 350);
  };

  // Выполнение задачи
  const toggleDone = (id) => {
    //  newDone = {};
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>{
        // const newDone = todo.id === id ?  todo : {};
        return todo.id === id ? { ...todo, done: !todo.done } : todo
  })
    );
    // if (newDone !== {}) {
    //   if (newDone.done && allDone.indexOf(newDone)<0) allDone.push(newDone)
    //   else if ( newDone !== {} && !newDone.done && allDone.indexOf(newDone)>=0) allDone.splice(allDone.indexOf(newDone),1) 
    //   console.log(newDone)
    //   console.log(allDone)
    // }
   
  };

  // Добавление в избранные
  const addToFav = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    )
  }

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

  // Регистрация
  const [regOn, setRegOn] = useState(false);

  //Авторизация
  const [autOn, setAutOn] = useState(false);


  return (
    <div className="App">
      <div className="allMenuContainer">
        { authorised && < Profile
          avatar={avatar}
          nickname={nickname}
          email={email}
        />}
        { !authorised && 
        <div className='butcont'>
        <div
          className='regbut'
          onClick={()=>{
            setAutOn(false);
            setRegOn(true)
          }}
        >
          Регистрация
        </div>
        <div
          className='autbut'
          onClick={()=>{
            setRegOn(false)
            setAutOn(true);
          }}
        >
          Вход
        </div>
        </div>} 
        <Search
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
        <AllCategories
          handleCategoryChange={handleCategoryChange}
          activeCategory={selectedCategory}
        />

      </div>


      <div className="allTodoContainer">
        {/* ЗАГОЛОВОК */}

        { authorised && <div className='headerTodos'>
          <h2>
            {categoryIcon}
            {categoryName}
          </h2>
          <div className="sort" onClick={sortTodosByDate}>
            <FontAwesomeIcon icon={faArrowDownWideShort}
            /></div>
        </div>}

        {/* ЗАДАЧИ */}
        { authorised && <TodoList
          todos={applyFilters(todos)}
          toggleDone={toggleDone}
          addToFav={addToFav}
          deleteTask={deleteTask}
          editTask={editTask}
          selectedCategory={selectedCategory}
          allTodos={todos}
          formatDateTime={formatDateTime}
        />}
        {/* ДОБАВЛЕНИЕ ЗАДАЧ */}
        { authorised && <TodoAdd
          addTodo={addTodoHandler}
        />}
        { !authorised && !autOn && <RegForm/>}
        { !authorised && autOn && !regOn && <AutForm/>}
      </div>
    </div>
  )
}

export default App;
