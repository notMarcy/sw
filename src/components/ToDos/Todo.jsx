import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faPenToSquare, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import styles from './Todo.module.css';

function Todo({
  todo,
  toggleDone,
  deleteTask,
  editTask
}) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const inputRef = useRef(null);

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
    setTimeout(() => {
      setEditing(false);
    }, 100)
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

  return (
    <li className={`${styles.todoContainer} ${todo.done ? styles.done : ''}`}>
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
        {/* редактировать */}
        {editing ? (
          <div className={styles.save} onClick={saveChanges}>
            <FontAwesomeIcon icon={faDownload} shake />
          </div>
        ) : (
          <div className={styles.edit} onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
        {/* удалить */}
        <div
          className={styles.delete}
          onClick={() => {
            deleteTask(todo.id);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>

    </li>
  );
}

export default Todo;
