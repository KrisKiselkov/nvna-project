"use client";

import styles from './requestForm.module.css';


export default function RequestForm({ formOpen }) {
    return (
        <div className={styles["request-form"]}>
            <div className={styles["request-form__rf-div"]}>
                <div className={styles["rf-div__rf-content"]}>
                    <h2 className={styles['rf-content__rf-h2']}>Докладна книга</h2>
                    <h2 className={styles['rf-content__close']} onClick={formOpen}>X</h2>
                    <form id={styles['rf-content__rf-form']} action="">
                        <label className={styles['rf-form__label']} for='name'>Име:</label>
                        <input type="text" name="name" id='name' className={styles['rf-form__input']} placeholder='Име...' required />
                        <label className={styles['rf-form__label']} for='email'>Имейл:</label>
                        <input type="email" name="email" id='email' className={styles['rf-form__input']} placeholder='Имейл...' required />
                        <label className={styles['rf-form__label']} for='city'>Град:</label>
                        <input type='text' name='city' id='city' className={styles['rf-form__input']} placeholder='Град...' required />
                    
                        <br></br>
                        <br></br>

                        <label className={styles['rf-form__label']}>Начална дата:</label>
                        <input type="date" name="start_date" className={styles['rf-form__input']} required></input>

                        <label className={styles['rf-form__label']}>Крайна дата:</label>
                        <input type="date" name="end_date" className={styles['rf-form__input']} required></input>

                        <label className={styles['rf-form__label']}>Вид пари:</label>
                        <div className={styles['rf-form__rf-check-div']}>
                            <label for="daily" className={styles['rf-check-div__label']} >Дневни</label>
                            <input type="checkbox" name="type_money" id='daily'
                            className={styles['rf-check-div__checkbox']} value="Дневни"></input>
                            <label for="apartment" className={styles['rf-check-div__label']} >Квартирни</label>
                            <input type="checkbox" name="type_money" id='apartment'
                            className={styles['rf-check-div__checkbox']} value="Дневни"></input>
                            <label for="travel" className={styles['rf-check-div__label']} >Пътни</label>
                            <input type="checkbox" name="type_money" id='travel'
                            className={styles['rf-check-div__checkbox']} value="Дневни"></input>
                        </div>

                        <label className={styles['rf-form__label']}>Платец:</label>
                        <select name="biller" className={styles['rf-form__rf-select']} required>
                            <option value="">-- Изберете --</option>
                            <option className={styles['rf-select__option']}>ВВМУ</option>
                            <option className={styles['rf-select__option']}>Проект</option>
                            <option className={styles['rf-select__option']}>Външна организация</option>
                        </select>

                        <label className={styles['rf-form__label']}>Коментар:</label>
                        <textarea className={styles['rf-form__textarea']} name="comment" rows="4" placeholder="Допълнителна информация или коментари..."></textarea>

                        <button type="submit" className={styles['rf-form__submit']}>Изпрати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}