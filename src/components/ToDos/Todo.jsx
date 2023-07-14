import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import styles from './Todo.module.css';

function Todo({ todo, toggleDone, addToFav, deleteTask, editTask}) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isDeleting) {
      // Задержка перед удалением задачи
      const deleteTimeout = setTimeout(() => {
        deleteTask(todo.id);
      }, 350);

      // Очистка таймера при размонтировании компонента или при изменении состояния
      return () => {
        clearTimeout(deleteTimeout);
      };
    }
  }, [isDeleting, deleteTask, todo.id]);

  const toggleEditing = () => {
    setEditing((prevEditing) => !prevEditing);
    setEditedText(todo.text);

    if (!editing) {
      setTimeout(() => {
        const input = inputRef.current;
        input.focus();
        input.selectionStart = input.value.length;
        input.selectionEnd = input.value.length;
      }, 0);
    }
  };

  const saveChanges = () => {
    if (editing && editedText.trim() !== '') {
      editTask(todo.id, editedText);
    }
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveChanges();
    }
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  return (
    <li
      className={`${styles.todoContainer} ${todo.done ? styles.done : ''} ${todo.isNew ? styles.adding : ''
        } ${isDeleting ? styles.deleting : ''}`}
    >
      <div className={styles.leftSide}>
        <div
          className={styles.check}
          onClick={() => {
            toggleDone(todo.id);
          }}
        >
          {todo.done && <FontAwesomeIcon icon={faCheck} />}
        </div>
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
        ) : (
          <div className={styles.textAndDate}>
            <p className={styles.text}>{todo.text}</p>
            <p className={styles.date}>{todo.date}</p>
          </div>
        )}
      </div>
      <div className={styles.rightSide}>
        {/* в избранное */}
        <div className={styles.favorites} onClick={() => addToFav(todo.id)}>
          {!todo.favorite ? (
            <FontAwesomeIcon icon={faStarRegular} />
          ) : (
            <FontAwesomeIcon icon={faStarSolid} />
          )}
        </div>
        {/* редактировать */}
        {editing ? (
          <div className={styles.save} onClick={saveChanges}>
            <FontAwesomeIcon icon={faShareFromSquare} fade />
          </div>
        ) : (
          <div className={styles.edit} onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
        {/* удалить */}
        <div className={styles.delete} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </li>
  );
}

export default Todo;
