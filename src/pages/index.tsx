import { GetServerSideProps } from 'next'

import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallanges } from '../components/CompletedChallanges'
import { CountDown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountDownProvider } from '../contexts/CountDownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import Head from 'next/head'

import style from '../styles/pages/Home.module.css'
import React from 'react'

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props : HomeProps) {
  
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
     >
    <div className={ style.container } >
      <Head>
        <title>Início | move.it</title>
      </Head>

      <ExperienceBar />

      <CountDownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallanges />
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}

// Para poder obter as infromçaões dos coockies
export const getServerSideProps:GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted  } = context.req.cookies
  return{
    props:{
       level : Number(level),
      currentExperience : Number(currentExperience),
      challengesCompleted : Number(challengesCompleted)
    }
  }
}