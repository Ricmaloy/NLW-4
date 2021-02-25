import { createContext, useState, ReactNode, useEffect } from 'react';

import challenges from '../../challenges.json';

interface ChallengeProviderProps {
    children: ReactNode
}

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number, 
    currentXP: number, 
    challengesCompleted: number, 
    activeChallenge: challenge,
    experienceToNextLevel: number,
    levelUp: () => void, 
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:ChallengeProviderProps){

    const [level, setLevel] = useState(1);
    const [currentXP, setCurrentXP] = useState(0);
    const [challengesCompleted, sethallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {  
        const randonChallengeIndex = Math.floor(Math.random()*challenges.length);
        const challenge = challenges[randonChallengeIndex];

        setActiveChallenge(challenge);
    
        new Audio('/notification.mp3').play();
        
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} XP!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) return;

        const { amount } = activeChallenge;

        let finalXP = currentXP + amount;

        if (finalXP > experienceToNextLevel) {
            finalXP = finalXP - experienceToNextLevel;
            levelUp();
        }

        setCurrentXP(finalXP);
        setActiveChallenge(null);
        sethallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level, 
            currentXP, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp, 
            startNewChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}

// focopraticagrupo

//neverstoplearning