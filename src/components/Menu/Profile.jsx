import styles from './Profile.module.css'

function Profile({ avatar, nickname, email }) {

  const [name, surname] = nickname.split(' ')
  const initials = name[0] + surname[0]

  return (
    <div className={styles.profileContainer}>
      {/* аватар */}
      {avatar ? (
        <div className={styles.avatarImg}></div>
      ) : (
        <div className={styles.avatarInitials}>{initials}</div>
      )
      }
      <div className={styles.textInfo}>
        {/* никнейм */}
        <p className={styles.nickname}>{nickname}</p>
        {/* email */}
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  )
}

export default Profile