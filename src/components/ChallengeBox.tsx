import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountDownContext } from '../contexts/CountDownContext'

import style from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
    const { resetCountDown } = useContext(CountDownContext)

    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountDown()
        resetChallenge()
    }
    function handleChallengeFailed(){
        resetCountDown()
        resetChallenge()
    }

    return(
        <div className={style.challengeBox }>

            { activeChallenge ? (
                <div className={ style.challengeActive }>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Level Up" />
                        <strong>Novo desafio</strong>
                        <p>
                            {activeChallenge.description}
                        </p>
                    </main>
                    <footer>
                        <button
                        type="button"
                        className={style.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                        type="button"
                        className={style.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={ style.challengeNotActive }>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avança de level completando desafios
                    </p>
                </div>
            )}            
        </div>
    )

}