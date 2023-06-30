import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.css'

function Search({ searchTerm, handleSearch }) {
  return (
    <div className={styles.searchInputContainer}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Поиск"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
    </div>
  )
}

export default Search