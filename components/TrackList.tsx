import { ReactNode } from "react";
import styles from "../styles/TrackItem.module.css"
import Clock from "./Utils/Clock";

type Props = {
    children: ReactNode;
};

export function TrackList({ children }: Props) {
    return (
        <div className={styles.contentSpacing}>
            <div className={styles.columnNameStyling}>
                <div className={styles.trackItemWrapper}>
                    <div className={styles.hashtag}>
                        #
                    </div>

                    <div className={styles.trackInfo}>
                        TITLE
                    </div>

                    <div className={styles.trackAlbum}>
                        ALBUM
                    </div>

                    <div className={styles.dateAdded}>
                        DATE ADDED
                    </div>

                    <div className={styles.clockWrapper}>
                        <Clock color={"white"} />
                    </div>
                </div>
            </div>
            {children}
        </div >
    )
}
