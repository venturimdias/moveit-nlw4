/*
import { Button } from './components/Button'
<Button color="#b4e88a">Botão 1</Button>
*/
import {useState} from 'react'

/* pode-se usar 'type' ou 'interface' */
interface ButtonProps{
    color: string,
    children: string
}
export function Button(props: ButtonProps){
    //desestruturação de array que vem com duas posições
    // cada estado é do componente e não global
    const [counter, setCounter] = useState(1) 

    function incrementar(){
        setCounter(counter + 1)
    }

    return(
        <button 
        type="button" 
        style={{ backgroundColor: props.color, border: 0, padding:10, fontSize:20 }}
        onClick={incrementar}
        >
             {props.children} <strong>[ {counter} ]</strong>
        </button>
    )
}