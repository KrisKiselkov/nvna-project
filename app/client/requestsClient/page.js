"use client";

import styles from './requestsClient.module.css';
import { useState } from 'react';
import RequestForm from './requestForm';
import { mockTasks } from './requestClientData';


export default function RequestsClient () {
    const [ mockedTasks, setMockedTasks ] = useState(mockTasks);

    const [ formOpen, setFormOpen ] = useState(false);
    console.log(formOpen);
    const handleFormOpen = () => {
        setFormOpen(true);
    }

    const handleFormClose = () => {
        setFormOpen(false);
    }

    const [taskDone, setTaskDone] = useState(
        mockedTasks.map(task => task.status === "done")
    );

    const toggleTask = (id) => {
        setMockedTasks((prev) => {
            const updated = prev.map((t) =>
            t.id === id ? { ...t, status: t.status === "done" ? "active" : "done" } : t
            );

            // тук вече връщаме сортиран масив
            return updated.sort((a, b) => {
            if (a.status === "done" && b.status !== "done") return -1;
            if (a.status !== "done" && b.status === "done") return 1;
            return 0;
            });
        });
    };

    const allTasks = () => {
        return mockedTasks.map((task) => (
            <div className={styles["user-db-divs__tasks-div"]} key={task.id}>
            <div
                className={
                styles["tasks-div__task-end-date-div"] +
                (task.status === "done" ? " " + styles.taskDone : "")
                }
            >
                <p className={styles["tasks-div__task-p"]}>{task.title}</p>
                <p className={styles["tasks-div__end-date-p"]}>
                {task.startDate} - {task.endDate}
                </p>
            </div>
            <button
                onClick={() => toggleTask(task.id)}
                className={styles["tasks-div__btn"]}
            >
                &#10004;
            </button>
            </div>
        ));
    };


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
            <p className={styles["user-greeting__p"]}>
                Добре дошъл в твоя потребителски портал.
            </p>
            </div>

            <div className={styles["mrc-body__user-dashboard"]}>
            <h3 className={styles["user-dashboard__h3"]}>Таблото на Иван</h3>
            <div className={styles["user-dashboard__user-db-req"]}>
                
                {/* Текущи задачи */}
                <div className={styles["user-db-req__user-db-main-div"]}>
                <h4 className={styles["user-db-divs__h4"]}>Текущи задачи</h4>
                {allTasks()}
                </div>

                {/* Най-често използвани услуги */}
                <div className={styles["user-db-req__user-db-divs"]}>
                <h4 className={styles["user-db-divs__h4"]}>Най-често използвани услуги</h4>
                <p>(няма данни)</p>
                </div>

                {/* Информационно табло */}
                <div className={styles["user-db-req__user-db-divs"]}>
                <h4 className={styles["user-db-divs__h4"]}>Информационно табло</h4>
                <div className={styles["mrc-body__days-off-new-request"]}>
                    <div className={styles["days-off-new-request__days-off"]}>
                    <p className={styles["days-off__num"]}>20</p>
                    <p className={styles["days-off__p"]}>оставащи дни<br />отпуск</p>
                    </div>
                    <div className={styles["days-off-new-request__new-request"]}>
                    <button className={styles["new-request__button"]} onClick={handleFormOpen}>Нова заявка</button>
                    </div>
                </div>
                </div>

            </div>
            </div>    
        </div>
        { formOpen ?
            <RequestForm formOpen={handleFormClose}/>
            : null
        }
        </div>
    );
}
