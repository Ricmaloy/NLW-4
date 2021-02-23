import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ricmaloy.png" alt="userPhoto"/>
            <div>
                <strong>Ricardo Zamboni</strong>
                <p>
                    <img src="icons/level.svg" alt="level icon"/>
                    Level 01
                </p>
            </div>
        </div>
    )
}