import Head from 'next/head';

import {GetServerSideProps} from 'next'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { AsideBar } from '../components/AsideBar';

interface HomeProps {
  level: number,
  currentXP: number,
  challengesCompleted: number,
  theme: string
}

export default function Home(props:HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentXP={props.currentXP}
      challengesCompleted={props.challengesCompleted}
      theme={props.theme}
    >
      <div className={styles.container}>

        <AsideBar />
        
        <div className={styles.content}>
          <Head>
            <title>Início | move.it</title>
          </Head>

          <ExperienceBar />
          
          <CountdownProvider >
            <section>
              <div >
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>  
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentXP, challengesCompleted, theme} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXP: Number(currentXP),
      challengesCompleted: Number(challengesCompleted),
      theme: String(theme)
    }
  }
}