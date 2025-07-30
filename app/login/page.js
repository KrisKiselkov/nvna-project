import styles from './login.module.css';
import { useState } from 'react';


export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

  const handleClick = () => {
    if (email === 'kristian.project@nvna.eu') {
        onLogin();
    } else {
        alert('Невалиден имейл. Моля, опитайте отново.');
    }
  };
  
  
  return (
        <body className={styles["main__loginMain"]}>
            <div className={styles["loginMain__login-menu"]}>
                <div className={styles["loginMain__login-container"]}>

                    <h2 className={styles["login-container__h2"]}>Влезте с вашият служебен имейл</h2>
                    <p className={styles["login-container__p"]}>За да използвате системата, моля влезте с вашият name.project@nvna.eu имейл.</p>
                    <div className={styles["login-container__login-inputs"]}>
                        <input type="text" placeholder="Имейл" className={styles["login-inputs__input"]} value={email} onChange={handleEmail} />
                        <input type="password" placeholder="Парола" className={styles["login-inputs__input"]} />
                        <p className={styles["login-inputs__p"]}>Забравена парола</p>
                    </div>
                    <button className={styles["login-container__login-button"]} onClick={handleClick}>
                        Влез
                    </button>
    
                </div>
            </div>

            <div className={styles["loginMain__login-banner"]}>

            </div>
        </body>
    )
}