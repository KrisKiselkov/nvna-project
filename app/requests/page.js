"use client";

import styles from './requests.module.css';
import { requestData } from './requestData';
import { useState } from 'react';


export default function RequestsPage() {
    const [ requestDataState, setRequestDataState ] = useState(requestData);
    
    // Pagination logic
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = requestDataState.slice(startIndex, endIndex);

    const totalPages = Math.ceil(requestDataState.length / itemsPerPage);

    const nextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Function to get the class based on the status
    function getStatusClass(status) {
        switch (status) {
            case "Потвърден":
            return "status--approved";
            case "В изчакване":
            return "status--pending";
            case "Отхвърлен":
            return "status--rejected";
            default:
            return "";
        }
    }

    // Map through the requestDataState to create table rows
    const allRequests = currentItems.map((request, index) => (
        <tr key={request.id}>
            <td>{index + 1}</td>
            <td>{request.email}</td>
            <td>{request.phone}</td>
            <td>{request.date}</td>
            <td><p className={`${styles['tbody__status']} ${styles[getStatusClass(request.status)]}`}>{request.status}</p></td>
        </tr>
    ));



    return (
        <div className={styles.main}>
            <div className={styles['main__main-card']}>
                <div className={styles["main-card__main-card-header"]}>
                     <h3 className={styles["main-card-header__h3"]}>Заявки за отпуски</h3>

                    <div className={styles["main-card-header__header-notif-profile-div"]}>
                        <figure className={styles["header-notif-profile-div__figure"]}>
                        <img src="images/notifications_18dp_181818_FILL0_wght400_GRAD0_opsz20.png" />
                        </figure>

                        <div className={styles["header-notif-profile-div__header-profile-div"]}>
                        <p className={styles["header-profile-div__p"]}>Профил</p>
                        </div>
                    </div>
                </div>

                <div className={styles["main-card__main-card-body"]}>
                    <div className={styles["main-card-body__body-sel-doc"]}>
                    <p className={styles["body-sel-doc__p"]}>Избери вид документ</p>
                    <select className={styles["body-sel-doc__sel-doc"]}>
                        <option className={styles["sel-doc__option"]}>Отпуски</option>
                        <option className={styles["sel-doc__option"]}>Друго</option>
                        <option className={styles["sel-doc__option"]}>Друго</option>
                    </select>
                    </div>

                    <div className={styles["main-card-body__body-all-details"]}>
                    <div className={styles["body-all-details__bad-header"]}>
                        <p className={styles["bad-header__p"]}>Всички заявки</p>
                    </div>

                    <div className={styles["body-all-details__bad-search"]}>
                        <input
                        type="search"
                        className={styles["bad-search__input"]}
                        placeholder="Търси по име"
                        />
                        <div className={styles["bad-search__search-by"]}>
                        <p className={styles["search-by__p"]}>Търси по</p>
                        <select className={styles["search-by__sb-select"]}>
                            <option className={styles["sb-select__option"]}>Номер</option>
                            <option>Email</option>
                            <option>Тел. Номер</option>
                            <option>Дата</option>
                        </select>
                        </div>
                    </div>

                    <div className={styles["body-all-details__bad-table"]}>
                        <table className={styles["bad-table"]}>
                            <thead className={styles["bad-table__thead"]}>
                                <tr>
                                <th>Номер</th>
                                <th>Email</th>
                                <th>Тел. Номер</th>
                                <th>Дата</th>
                                <th>Статус</th>
                                </tr>
                            </thead>

                            <tbody className={styles["bad-table__tbody"]}>
                                {allRequests}
                            </tbody>

                            <tfoot className={styles["bad-table__tfoot"]}>
                                <tr>
                                    <td colSpan={5}>
                                        <div className={styles["tfoot__flex"]}>
                                            <p className={styles["tfoot__p"]}>Показване на {Math.min(endIndex, requestData.length)} от {requestData.length} заявки</p>
                                            <div className={styles["tfoot__table-page-nav"]}>
                                                <p className={styles["table-page-nav__p"]}>Страница {page} от {totalPages}</p>
                                                <button onClick={prevPage} className={`${styles["table-page-nav__tpn-btn"]} ${styles["tpn-btn--back"]}`}>
                                                Назад
                                                </button>
                                                <button onClick={nextPage} className={`${styles["table-page-nav__tpn-btn"]} ${styles["tpn-btn--next"]}`}>
                                                Напред
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}