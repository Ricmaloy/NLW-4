import styles from '../styles/components/AsideBar.module.css';
import { Toggle } from '../components/Toggle';

export function AsideBar() {
    return(
        <div className={styles.aside}>
          <img src="/icons/fist.svg" alt="logo"/>
          <div className={styles.options}>
            <a href="/"><img src="/icons/home.svg" alt="home Icon"/></a>
            <a href="/"><img src="/icons/award.svg" alt="award Icon"/></a>
          </div>
          <Toggle />
        </div>
    )
}