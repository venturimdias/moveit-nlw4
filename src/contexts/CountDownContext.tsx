import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void,
}

interface CountDownProviderProps{
    children: ReactNode;  
}

export const CountDownContext = createContext({} as CountDownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountDownProvider({ children } : CountDownProviderProps ){
    const { startNewChallenge } = useContext(ChallengesContext)

    const min = 25 * 60 
    const [time, setTime] = useState(min)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60) // arredonda pra baixo
    const seconds = time % 60
    

    function startCountDown(){
        setIsActive(true)
    }
    
    function resetCountDown(){
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(min)
        setHasFinished(false)
    }
    // useEffects = quando algo mudar executar um função
    // primeira parametro sempre uma função, pode ser uma arrow function
    // segundo parametro quando eu vou executar
    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() =>{
                setTime(time - 1)
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()                        
        }
        //console.log('teste', active)
    },[isActive, time])



    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            { children }
        </CountDownContext.Provider>
    )
}