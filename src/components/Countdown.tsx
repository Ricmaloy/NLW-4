import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext)    

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    const [perc, setPerc] = useState(100);

    useEffect(()=>{
        const percentage =  Math.round(((minutes*60 + seconds)*100)/ (25*60));
        setPerc(percentage);

    },[seconds, minutes]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                disabled
                className={styles.countdownButton}
            >
                Ciclo encerrado
            </button>
            ) :
                (<>
                    {
                        isActive ? 
                        (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            <p>Abandonar ciclo</p>
                            <div className={styles.timeout} style={{width: `${perc}%`}} ></div>
                        </button>
                        ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            <p>Iniciar um ciclo</p>
                        </button>
                        )
                    }
                </>)
            }

            
            
        </div>
    )
}

// jornada infinita