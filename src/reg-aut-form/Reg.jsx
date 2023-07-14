import styles from './Reg.module.css'

export default function RegForm(){
    return(
       <div className={styles.regform}>
        <h3>Регистрация</h3>
        <form className={styles.form}>
            <label>
                Email:
                <input type="text" name="email" placeholder='example@gmail.com'/>
             </label>
             <label>
                Пароль:
                <input type="password" name="password" placeholder=''/>
             </label>
            <input type="submit" value="Зарегистрироваться" className={styles.but}/>
        </form>
        </div> 
    )
}