import { useContext, useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengesContext)
    const [ hasConfetti, setHasConfetti] = useState(false);

    useEffect(() => {
        setHasConfetti(true);
    },[]);

    const config = {
        angle: 90,
        spread: 460,
        startVelocity: 100,
        elementCount: 400,
        dragFriction: 0.21,
        duration: 20000,
        stagger: 5,
        width: "11px",
        height: "10px",
        perspective: "645px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    return(
        <>
            <div className={styles.overlay}> 
                <div className={styles.confettiContainer} >
                    <Confetti active={hasConfetti}  config={ config } />
                </div>
                <div className={styles.container}> 
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button 
                    type="button"
                    onClick={closeLevelUpModal}
                >
                    <img src="/icons/close.svg" alt="close"/>
                </button>
                </div>
            </div>
        </>
    )
}   