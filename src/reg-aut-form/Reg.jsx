import styles from './Reg.module.css'

export default function RegForm(){
    return(
       <div className={styles.regform}>
        <h3>AUTHENTICATION</h3>
        <form className={styles.form}>
            <label>
                Email:
                <input type="text" name="email" placeholder='example@gmail.com'/>
             </label>
             <label>
                Password:
                <input type="password" name="password" placeholder='**********'/>
             </label>
            <input type="submit" value="LOG IN" className={styles.but}/>
        </form>
        </div> 
    )
}