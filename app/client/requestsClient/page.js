import styles from './requestsClient.module.css';


export default function RequestsClient () {
    return (
        <div className={styles["main-requests-client"]}>
            <div className={styles["main-requests-client__mrc-header"]}>
                <h3 className={styles["mrc-header__h3"]}>Заявки за отпуски</h3>

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
                <div className={styles["mrc-body__days-off-new-request"]}>
                    <div className={styles["days-off-new-request__days-off"]}>
                        <p className={styles["days-off__num"]}>20</p>
                        <p className={styles["days-off__p"]}>оставащи дни<br></br> отпуск</p>
                    </div>

                    <div className={styles["days-off-new-request__new-request"]}>
                        <button className={styles["new-request__button"]}>Нова заявка</button>
                    </div>
                </div>    
            </div>
        </div>
    );
}