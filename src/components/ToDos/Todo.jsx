import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import styles from './Todo.module.css';

function Todo({
  todo,
  targetIndex,
  toggleDone,
  deleteTask,
  editTask
}) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEditing = () => {
    if (editing) saveChanges();
    else setEditing(true);
  };

  const saveChanges = () => {
    setEditing(false);
    if (editedText.trim() !== '') editTask(targetIndex, editedText);
    else setEditedText(todo.text);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') saveChanges();
  };

  const handleBlur = () => {
    if (editing) {
      setTimeout(() => {
        saveChanges();
      }, 100);
    }
  };

  return (
    <li className={`${styles.todoContainer} ${todo.done ? styles.done : ''}`}>
      <div className={styles.leftSide}>
        <div
          className={styles.check}
          onClick={() => {
            toggleDone(targetIndex);
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
          <p>{todo.text}</p>
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
            deleteTask(targetIndex);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </li>
  );
}

export default Todo;
