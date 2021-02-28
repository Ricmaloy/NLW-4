import styles from '../styles/components/Toggle.module.css';

import Cookies from "js-cookie";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { useContext, useEffect, useState } from "react";

export function Toggle() {
    const { theme } = useContext(ChallengesContext);
    const [isLightTheme, setIsLightTheme] = useState(theme === "light" ? true : false);

    useEffect(() => {
        if (theme !== "undefined" && theme !== "") {
          document.documentElement.setAttribute("data-theme", theme);
        }
      }, []);

    function SwitchTheme( ) {
        const htmlTheme = document.documentElement.getAttribute("data-theme");

        if (htmlTheme !== "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        setIsLightTheme(false);
        Cookies.set("theme", "dark");
        } else {
        document.documentElement.setAttribute("data-theme", "light");
        setIsLightTheme(true);
        Cookies.set("theme", "light");
        }
    }

    return (
        <div className={styles.switchContainer}>
            <span className={styles.switchSpan}>labelLeft</span>
            <input
                checked={isLightTheme}
                type="checkbox"
                id="switch"
                onChange={SwitchTheme}
            />
            <label htmlFor="switch"></label>
            <span className={styles.switchSpan}>labelRight</span>
        </div>
    )
}