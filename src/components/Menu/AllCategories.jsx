import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity, faSun, faStar, faTable } from '@fortawesome/free-solid-svg-icons';

import styles from './AllCategories.module.css'

function AllCategories({ handleCategoryChange, activeCategory }) {
  return (
    <>
      <hr />
      {/* все задачи */}
      <div
        className={`${styles.category} ${styles.catAll} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => { handleCategoryChange('all') }}
      >
        <span className={styles.icon}><FontAwesomeIcon icon={faInfinity} /></span>
        <span className={styles.text}>Все задачи</span>
      </div>
      {/* сегодня */}
      <div className={`${styles.category} ${styles.catToday} ${activeCategory === 'today' ? styles.active : ''}`}
        onClick={() => { handleCategoryChange('today') }}
      >
        <span className={styles.icon}><FontAwesomeIcon icon={faSun} /></span>
        <span className={styles.text}>Сегодня</span>
      </div>
      {/* избранные */}
      <div className={`${styles.category} ${styles.catFav} ${activeCategory === 'favorites' ? styles.active : ''}`}
        onClick={() => { handleCategoryChange('favorites') }}
      >
        <span className={styles.icon}><FontAwesomeIcon icon={faStar} /></span>
        <span className={styles.text}>Избранные</span>
      </div>
      {/* статистика */}
      <div className={`${styles.category} ${styles.catStat} ${activeCategory === 'statistics' ? styles.active : ''}`}
        onClick={() => { handleCategoryChange('statistics') }}
      >
        <span className={styles.icon}><FontAwesomeIcon icon={faTable} /></span>
        <span className={styles.text}>Статистика</span>
      </div>

    </>
  )
}

export default AllCategories