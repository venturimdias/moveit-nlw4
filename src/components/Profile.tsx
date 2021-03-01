import { useContext } from 'react'
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext'
import style from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext)
    return(
        <div className={style.profileContainer}>
            <img src='https://github.com/venturimdias.png' alt="Jonathan Venturim" />
            <div>
                <strong>Jonathan Venturim Dias</strong>
                <p>
                    <img src='icons/level.svg' alt="Level" />
                    Level { level }
                </p>
            </div>

        </div>
    )
}