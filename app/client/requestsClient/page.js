"use client";

import styles from './requestsClient.module.css';
import { useState } from 'react';


export default function RequestsClient () {
    const tasks = [1, 2, 3]; // example tasks
    const [taskDone, setTaskDone] = useState(Array(tasks.length).fill(false));

    const toggleTask = (index) => {
        setTaskDone((prev) =>
            prev.map((s, i) => (i === index ? !s : s))
        );
    };

    const allTasks = () => {
        return tasks.map((task, index) => (
            <div className={styles["user-db-divs__tasks-div"]} key={index}>
                <div key={index} className={styles["tasks-div__task-end-date-div"] + (taskDone[index] ? " " + styles.taskDone : "")}>
                    <p className={styles["tasks-div__task-p"]}>Задача {task}</p>
                    <p className={styles["tasks-div__end-date-p"]}>17.08.2025</p>
                </div>
                <button onClick={() => toggleTask(index)} className={styles["tasks-div__btn"]}>&#10004;</button>
            </div>
        ));
    }

    return (
        <div className={styles["main-requests-client"]}>
            <div className={styles["main-requests-client__mrc-header"]}>
                <h3 className={styles["mrc-header__h3"]}>Потребителски портал</h3>

                <div className={styles["mrc-header__header-notif-profile-div"]}>
                    <figure className={styles["header-notif-profile-div__figure"]}>
                    <img src="images/notifications_18dp_181818_FILL0_wght400_GRAD0_opsz20.png" />
                    </figure>

                    <div className={styles["header-notif-profile-div__header-profile-div"]}>
                    <p className={styles["header-profile-div__p"]}>Профил</p>
                    </div>
                </div>
            </div>

            <div className={styles["main-requests-client__mrc-body"]}>
                <div className={styles["mrc-body__user-greeting"]}>
                    <h2 className={styles["user-greeting__h2"]}>Здравей, Иван!</h2>
                    <p className={styles["user-greeting__p"]}>Добре дошъл в твоя потребителски портал.</p>
                </div>

                <div className={styles["mrc-body__days-off-new-request"]}>
                    <div className={styles["days-off-new-request__days-off"]}>
                        <p className={styles["days-off__num"]}>20</p>
                        <p className={styles["days-off__p"]}>оставащи дни<br></br> отпуск</p>
                    </div>

                    <div className={styles["days-off-new-request__new-request"]}>
                        <button className={styles["new-request__button"]}>Нова заявка</button>
                    </div>
                </div>

                <div className={styles["mrc-body__user-dashboard"]}>
                    <h3 className={styles["user-dashboard__h3"]}>Таблото на Иван</h3>
                    <div className={styles["user-dashboard__user-db-req"]}>
                        <div className={styles["user-db-req__user-db-divs"]}>
                            <h4 className={styles["user-db-divs__h4"]}>Текущи задачи</h4>
                            
                            {allTasks()}
                            
                            
                        </div>

                        <div className={styles["user-db-req__user-db-divs"]}>
                            <h4 className={styles["user-db-divs__h4"]}>Отпуски</h4>
                        </div>

                        <div className={styles["user-db-req__user-db-divs"]}>
                            <h4 className={styles["user-db-divs__h4"]}>Текущи задачи</h4>
                        </div>

                        <div className={styles["user-db-req__user-db-divs"]}>
                            <h4 className={styles["user-db-divs__h4"]}>Текущи задачи</h4>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    );
}