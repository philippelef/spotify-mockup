import { ReactNode, useState } from "react";
import styles from "../styles/Layout.module.css"
import PlayerFooter from "./PlayerFooter";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.Root}>
            <main className={styles.MainView}>
                {children}
            </main>
            <PlayerFooter />
        </div>
    )
}

export default Layout