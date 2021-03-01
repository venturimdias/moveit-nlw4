import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';



export function CountDown(){
    
    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountDown,
        resetCountDown 
    } = useContext(CountDownContext)

    // 25 ok
    // 5 não ==>  05
    // padStart verificar se a string tem 2 espaços caso não tenho adiciona o '0'
    // desestruturando os minutos para pegar o primeiro, segundo item do array
    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

    
    return(
        <div>
            <div className={ styles.countDown }>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                disabled
                className={ `${styles.countDownButton}`}
                >
                    Ciclo encerrado 
                    <img src='icons/check_circle.svg' alt="check circle" />
                </button>
            ):(
                <>
                {/* quanto tem mais linhas colocar o html entre () */}
                { isActive ? (
                    <button 
                    type="button" 
                    className={ `${styles.countDownButton} ${styles.contDownButtonActive}`}
                    onClick={resetCountDown}
                    >
                        Abandonar ciclo 
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 14.41L25.59 13L20 18.59L14.41 13L13 14.41L18.59 20L13 25.59L14.41 27L20 21.41L25.59 27L27 25.59L21.41 20L27 14.41Z" fill="#666666"/></svg>
                    </button>
                ) : (
                    <button 
                    type="button" 
                    className={ styles.countDownButton}
                    onClick={startCountDown}
                    >
                        Iniciar um ciclo 
                        <img src='icons/play_arrow.svg' alt="play arrow" />
                    </button>
                )}
                </>
            )}


            
        </div>
    )
}