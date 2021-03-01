import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge{
    type: 'body' | 'eye',
    description: string,
    amount: number,
}

interface ChallengesContextData{
    level: number, 
    currentExperience: number, 
    experienceToNextLevel: number,
    challengesCompleted: number, 
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}
interface ChallengesProviderProps{
    children: ReactNode;  
    level: number,
    currentExperience: number,
    challengesCompleted: number
}
  

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps){

    // as duas ?? caso não tenha rest.level inicia com 1
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted  ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    // número 4 é o fator que determina o nível de dificuldade
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    // pedir permissão ao usuário
    useEffect(() => {
        Notification.requestPermission()
    }, [])

    // usar uma biblioteca para facilitar salvar no cookie
    // npm install js-cookie
    // como esta lib não tem tipagem basta adicionar 
    // para ver todas as lib que tem basta acessar
    // https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
    // npm install @types/js-cookie -D
    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    },[level, currentExperience, challengesCompleted])

    function levelUp(){
      setLevel(level + 1)
      setIsLevelModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        // notificar
        if(Notification.permission === 'granted'){
            new Notification('Novo desvio! 🎉🎉',{
                body:` Valendo ${ challenge.amount}px!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }    

    function completeChallenge(){
        if(!activeChallenge){
            return
        }
        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            }}>
        { children }
        { isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}
