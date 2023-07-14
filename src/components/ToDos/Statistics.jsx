import styles from './Statistics.module.css'

 export default function Statistica({forToday, todos, allTodos}){
    return(
        <div className={styles.stat}>
          <div className={styles.completedTodos}>
            <p> ВСЕГО ЗАДАНИЙ: </p>
            <p className={styles.countCompletedTasks}>{allTodos.length}</p>
          </div>
          <div className={styles.completedTodos}>
            <p> КОЛИЧЕСТВО ВЫПОЛНЕННЫХ ЗАДАНИЙ: </p>
            <p className={styles.countCompletedTasks}>{todos.length}</p>
          </div>
          <div className={styles.completedTodos}>
            <p> ЗАДАНИЙ НЕОБХОДИМО ВЫПОЛНИТЬ: </p>
            <p className={styles.countCompletedTasks}>{allTodos.length - todos.length}</p>
          </div>
          <div className={styles.completedTodos}>
            <p> ЗАДАНИЯ НА СЕГОДНЯ: </p>
            <p className={styles.countCompletedTasks}>{forToday.length}</p>
          </div>
        </div>
    )
 }