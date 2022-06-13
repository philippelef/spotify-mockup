import { ReactNode, useState } from "react";
import styles from "../styles/Layout.module.css"
import PlayerFooter from "./PlayerFooter";
import SideBar from "./SideBar";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.Root}>
            <div className={styles.SideBar}>
                <SideBar />
            </div>
            <main className={styles.MainView}>
                {children}
            </main>
            <footer className={styles.playerFooter}>
                <PlayerFooter />
            </footer>
        </div>
    )
}

export default Layout