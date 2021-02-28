import { createContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
    children: ReactNode,
    level: number,
    currentXP: number,
    challengesCompleted: number,
    theme: string
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
    isLevelUpModalOpen: boolean,
    theme: string,
    levelUp: () => void, 
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
        children,
        ...rest
    }:ChallengeProviderProps){

    const theme = rest.theme ?? 'dark';

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
    const [challengesCompleted, sethallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentXP', String(currentXP));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level, currentXP, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);

        new Audio('/level_up.mp3').play();
    }

    function closeLevelUpModal () {
        setIsLevelUpModalOpen(false);
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
            theme,
            level, 
            currentXP, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            isLevelUpModalOpen,
            levelUp, 
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
        }}>
            {children}

           { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

// focopraticagrupo

//neverstoplearning