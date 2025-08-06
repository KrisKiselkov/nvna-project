"use client";

import styles from './requests.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function RequestsPage() {

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const [ searchFilter, setSearchFilter ] = useState("Номер");
    const handleSearchFilterChange = (event) => {
        setSearchFilter(event.target.value);
    }


    // State to hold the filter value
    const [ filter, setFilter ] = useState("Всички");
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    
    // State to hold the request data
    const [ requestDataState, setRequestDataState ] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);

  fetch("https://script.google.com/macros/s/AKfycby71-AYib-ZhJZ6qB3GpqfdkJJYIN1ng4a6oAZO3eEA-RlEN7BSGRffFymn51Erdwjt/exec?action=list")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const mappedData = data.map((row, index) => ({
          id: index + 1,
          email: row[1] || "",
          phone: row[15]?.toString() || "",  // Example: "Тетевен" or number
          date: row[3]?.split("T")[0] || "", // Just the YYYY-MM-DD
          status: "В изчакване", // You can later replace this with real status if available
          type: row[16]?.includes("отпуск") ? "Отпуски" : "Командировки", // crude type guess
        }));

        setRequestDataState(mappedData);
      } else {
        console.error("Unexpected data format:", data);
      }
    })
    .catch(error => console.error("Fetch error:", error))
    .finally(() => setLoading(false));
}, []);

    
    const filteredRequests = requestDataState.filter(request => {
        if (filter === "Отпуски" || filter === "Командировки") {
            return request.type === filter
        } else {
            return true;
        }
    });


    const searchRequests = filteredRequests.filter(request => {
        const query = searchQuery.toLowerCase();
        if (searchFilter === "Номер") {
            return request.id.toString().includes(query);
        } else if (searchFilter === "Email") {
            return request.email.toLowerCase().includes(query);
        } else if (searchFilter === "Тел. Номер") {
            return request.phone.includes(query);
        } else if (searchFilter === "Дата") {
            return request.date.includes(query);
        }
    });
    
    
    // Pagination logic
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = searchRequests.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

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

    // State to hold the selected request and requested link display
    const [ selectedRequest, setSelectedRequest ] = useState(null);
    const [ requestedLinkDisplay, setRequestedLinkDisplay ] = useState(false);

    // Function to display the requested link
    const requestedLink = (request) => {
        console.log(selectedRequest);
        return (
            <div className={styles["main__requst-link-overlay"] + (requestedLinkDisplay ? " " + styles["requst-link-overlay--active"] : "")}>
            <div className={styles["requst-link-overlay__requset-link-div"]}>
                <p className={styles["requset-link-div__x"]} onClick={() => setRequestedLinkDisplay(false)}>X</p>
                <a className={styles["requset-link-div__a"]}>{request.email}</a>

                <div className={styles["requset-link-div__approve-reject-btns"]}>
                    <button className={`${styles["approve-reject-btns__btn"]} ${styles["approve-reject-btns__btn--approve"]}`}>Потвърди</button>
                    <button className={`${styles["approve-reject-btns__btn"]} ${styles["approve-reject-btns__btn--reject"]}`}>Отхвърли</button>
                </div>
            </div>
        </div>
        )
    }

    // Map through the requestDataState to create table rows
    const allRequests = currentItems.map((request, index) => (
        <tr onClick={() => {
            setSelectedRequest(request)
            setRequestedLinkDisplay(true);
        }} key={request.id}>
            <td>{request.id}</td>
            <td>{request.email}</td>
            <td>{request.phone}</td>
            <td>{request.date}</td>
            <td><p className={`${styles['tbody__status']} ${styles[getStatusClass(request.status)]}`}>{request.status}</p></td>
        </tr>
    ));

    return (
            <div className={styles.main}>
                { loading ? (
                    <div className={styles["main__loading"]}>
                        <p>Зареждане на заявки...</p>
                        {/* Optional: Add spinner here */}
                    </div>
                ) : (
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
                            <select className={styles["body-sel-doc__sel-doc"]} 
                            onChange={handleFilterChange}>
                                <option className={styles["sel-doc__option"]}>Всички</option>
                                <option className={styles["sel-doc__option"]} value="Отпуски">Отпуски</option>
                                <option className={styles["sel-doc__option"]} value="Командировки">Командировки</option>
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
                                placeholder="Търси..."
                                onChange={handleSearchChange}
                                value={searchQuery}
                                />
                                <div className={styles["bad-search__search-by"]}>
                                <p className={styles["search-by__p"]}>Търси по</p>
                                <select className={styles["search-by__sb-select"]}
                                onChange={handleSearchFilterChange}>
                                    <option className={styles["sb-select__option"]} value="Номер">Номер</option>
                                    <option value="Email">Email</option>
                                    <option value="Тел. Номер">Тел. Номер</option>
                                    <option value="Дата">Дата</option>
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
                                                    <p className={styles["tfoot__p"]}>Показване на {Math.min(endIndex, searchRequests.length)} от {searchRequests.length} заявки</p>
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
            )}

            {requestedLinkDisplay && selectedRequest && requestedLink(selectedRequest)}
        </div>
    );

}