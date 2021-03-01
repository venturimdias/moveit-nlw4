# Orientações

### Contexto
Contexto é uma forma de ter acesso a uma informação em diversos lugares
podemos ter objetos, função, variável dentro do contexto
Usar o contexto somente nos elementos que precisam compartilhar os estados

- Cria uma pasta [contexts] e um arquivo [CountDownContext.tsx]  default:
````
import { Children, createContext, ReactNode } from "react";

interface CountDownContextData{

}

interface CountDownProviderProps{
    children: ReactNode;  
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({ children } : CountDownProviderProps ){
    
    return(
        <CountDownContext.Provider value={{}}>
            {children}
        </CountDownContext.Provider>
    )
}
````

_app.tsx
```
import { ChallengesProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}
``` 


- Para usar eles nos componentes, basta importar e declarar
````
import { ChallengesContext } from '../contexts/ChallengesContext'

const contextData = useContext(ChallengesContext)
````

### Notificação Browser
Pedir permissões para o usuário
Com array vazio no segundo parametro executa somente uma vez 
[https://developer.mozilla.org/pt-BR/docs/Web/API/notificacoes]
````
  useEffect(() => {
      Notification.requestPermission()
  }, [])
````

- Para notificar
````
  if(Notification.permission === 'granted'){
      new Notification('Novo desvio! 🎉🎉',{
          body:` Valendo ${ challenge.amount}px!`
      })
  }
````


### typescript 
- ReactNode: aceita qualquer elemento filho: componente, texto, tag html
````
interface ChallengesProviderProps{
    children: ReactNode;  // obrigatório
    nome?: string // não é obrigatório quando se coloca ?
}
````


# DEPLOY
Serviços de deploy
#### Netlify
#### vercel

Baixar o vercel cli
````
npm i -g vercel
````
************************
Entra pelo terminal
````
vercel -h
vercel login
````

insira um email, ele vai enviar um email para confirmar, depois digite na pasta do projeto
````
vercel
````
Resposta: 
- Yes
- conta: venturimdias
- No
- coloque o nome do projeto
- qual pasta o projeto esta localizado ( só da enter )
- inicia a instação
- pergunta que ser sobrepor a configurção (N)

Caso tenha alguma alteração e queira subir novamente o projeto já existe, basta
````
verce -prod
````
Caso queira que vá pra teste só digitar
````
vercel
````

 